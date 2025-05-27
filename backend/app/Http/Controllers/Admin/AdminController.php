<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Passport\Token;
use App\Models\Activity;

class AdminController extends Controller
{
    public function getDashboardStats()
    {
        $totalUsers = User::count();
        $activeUserIds = Token::where('revoked', false)
            ->where('expires_at', '>', now())
            ->pluck('user_id')
            ->unique();
        $activeUsers = User::whereIn('id', $activeUserIds)->count();
        $newUsers = User::where('created_at', '>=', now()->subDays(7))->count();
        $adminUsers = User::where('is_admin', true)->count();
        
        $recentUsers = User::orderBy('last_login_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($user) use ($activeUserIds) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'last_login' => $user->last_login_at,
                    'is_admin' => $user->is_admin,
                    'permissions' => $user->permissions,
                    'is_active' => $activeUserIds->contains($user->id),
                ];
            });

        $recentActivities = Activity::with('user')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'user_name' => $activity->user ? $activity->user->name : null,
                    'type' => $activity->type,
                    'description' => $activity->description,
                    'created_at' => $activity->created_at,
                ];
            });

        return response()->json([
            'stats' => [
                'total_users' => $totalUsers,
                'active_users' => $activeUsers,
                'new_users' => $newUsers,
                'admin_users' => $adminUsers,
            ],
            'recent_users' => $recentUsers,
            'recent_activities' => $recentActivities,
        ]);
    }

    // Helper method to grant admin status and update is_admin
    public function grantAdmin($userId)
    {
        $user = User::findOrFail($userId);
        $user->is_admin = true;
        $user->permissions = [
            'read' => true,
            'write' => true,
            'edit' => true,
            'delete' => true,
        ];
        $user->save();
        return $user;
    }
} 