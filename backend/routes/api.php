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
use Illuminate\Support\Str;
use App\Http\Controllers\AdminReportController;

Route::post('/register', function (Request $request) {
    try {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        $isFirstUser = \App\Models\User::count() === 0;
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $isFirstUser,
        ]);

        // Log user registration
        \App\Models\Activity::create([
            'user_id' => $user->id,
            'type' => 'user_registered',
            'description' => 'New user registered: ' . $user->email,
        ]);

        $token = $user->createToken('api-token')->accessToken;
        return response()->json(['user' => $user, 'token' => $token], 201);
    } catch (\Exception $e) {
        // Log the exception for debugging
        \Log::error('Registration failed: ' . $e->getMessage(), ['exception' => $e]);
        return response()->json([
            'message' => 'Internal Server Error',
            'error' => $e->getMessage() // Include the specific error message
        ], 500); // Return 500 for server errors
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

    // BMI Routes
    Route::post('/bmi/calculate', [App\Http\Controllers\Api\BmiController::class, 'calculate']);
    Route::get('/bmi/history', [App\Http\Controllers\Api\BmiController::class, 'getHistory']);
    Route::delete('/bmi/history/{id}', [App\Http\Controllers\Api\BmiController::class, 'deleteHistory']);

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

        // Log admin user creation
        \App\Models\Activity::create([
            'user_id' => auth()->id(), // Assuming admin is logged in
            'type' => 'admin_created_user',
            'description' => 'Admin created new user: ' . $user->email,
        ]);

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
        $originalUser = $user->getOriginal(); // Get original data before update
        $user->update($data);
        $changes = $user->getChanges(); // Get changes after update

        // Prepare description of changes
        $changedFields = [];
        foreach ($changes as $key => $newValue) {
            if ($key !== 'updated_at') { // Exclude updated_at timestamp
                $oldValue = isset($originalUser[$key]) ? $originalUser[$key] : 'N/A';
                // Mask password in logs
                if ($key === 'password') {
                    $changedFields[] = "password (changed)";
                } else {
                     // Limit length of old and new values for brevity in logs
                    $oldValue = (is_array($oldValue) || is_object($oldValue)) ? json_encode($oldValue) : (string)$oldValue;
                    $newValue = (is_array($newValue) || is_object($newValue)) ? json_encode($newValue) : (string)$newValue;
                    $oldValue = Str::limit($oldValue, 50);
                    $newValue = Str::limit($newValue, 50);

                    $changedFields[] = "{$key}: '{$oldValue}' -> '{$newValue}'";
                }
            }
        }

        $description = 'Admin updated user: ' . $user->email;
        if (!empty($changedFields)) {
            $description .= ' (Changes: ' . implode(', ', $changedFields) . ')';
        }

        // Log admin user update
        \App\Models\Activity::create([
            'user_id' => auth()->id(), // Assuming admin is logged in
            'type' => 'admin_updated_user',
            'description' => $description,
        ]);

        return $user;
    });

    // Delete user (admin only)
    Route::delete('/users/{id}', function ($id) {
        if (!auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $user = User::findOrFail($id);
        $email = $user->email; // Get email before deletion
        $user->delete();

        // Log admin user deletion
        \App\Models\Activity::create([
            'user_id' => auth()->id(), // Assuming admin is logged in
            'type' => 'admin_deleted_user',
            'description' => 'Admin deleted user: ' . $email . ' (ID: ' . $id . ')',
        ]);

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

    // Route to get all activities (Admin only)
    Route::get('/activities', [App\Http\Controllers\Admin\AdminController::class, 'getAllActivities']);

    // Route to delete an activity (Admin only)
    Route::delete('/activities/{id}', [App\Http\Controllers\Admin\AdminController::class, 'deleteActivity']);

    // Content management routes
    Route::apiResource('contents', App\Http\Controllers\Api\ContentController::class);

    // Admin report routes
    Route::middleware('admin')->group(function () {
        Route::get('/admin/users/{user}/report', [AdminReportController::class, 'generateUserReport']);
    });
});

Route::middleware('auth:api')->post('/logout', function (Request $request) {
    $request->user()->token()->revoke();

    // Log user logout
    \App\Models\Activity::create([
        'user_id' => $request->user()->id,
        'type' => 'user_logged_out',
        'description' => 'User logged out: ' . $request->user()->email,
    ]);

    return response()->json(['message' => 'Successfully logged out']);
});
