<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WorkoutController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Activity;

Route::post('/register', function (Request $request) {
    try {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken('api-token')->accessToken;
        return response()->json(['user' => $user, 'token' => $token], 201);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 400);
    }
});

Route::post('/login', function (Request $request) {
    try {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 401);
        }
        $token = $user->createToken('api-token')->accessToken;
        Activity::create([
            'user_id' => $user->id,
            'type' => 'login',
            'description' => 'User logged in',
        ]);
        return response()->json(['token' => $token, 'user' => $user]);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 400);
    }
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('workouts', WorkoutController::class);

    // List all users (admin only)
    Route::get('/users', function () {
        if (!auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return User::all();
    });

    // Create a new user (admin only)
    Route::post('/users', function (Request $request) {
        if (!auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'permissions' => 'nullable|array',
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        return $user;
    });

    // Update user (admin only)
    Route::patch('/users/{id}', function (Request $request, $id) {
        if (!auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $user = User::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'is_admin' => 'sometimes|boolean',
            'permissions' => 'nullable|array',
        ]);
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        // Explicitly set and save is_admin if provided
        if (array_key_exists('is_admin', $data)) {
            $user->is_admin = $data['is_admin'];
            unset($data['is_admin']);
            $user->save();
        }
        $user->update($data);
        return $user;
    });

    // Delete user (admin only)
    Route::delete('/users/{id}', function ($id) {
        if (!auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    });

    Route::middleware('auth:api')->get('/admin/stats', function () {
        if (!auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $totalUsers = \App\Models\User::count();
        $activeUsers = \App\Models\User::whereNotNull('last_login_at')->where('last_login_at', '>=', now()->subDay())->count();
        $newSignups = \App\Models\User::where('created_at', '>=', now()->subDay())->count();
        $admins = \App\Models\User::where('is_admin', true)->count();

        return [
            'total_users' => $totalUsers,
            'active_users' => $activeUsers,
            'new_signups' => $newSignups,
            'admins' => $admins,
        ];
    });

    Route::get('/admin/dashboard/stats', [App\Http\Controllers\Admin\AdminController::class, 'getDashboardStats']);
});
