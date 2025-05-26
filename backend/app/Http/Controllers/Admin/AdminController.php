<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getDashboardStats()
    {
        $totalUsers = User::count();
        $activeUsers = User::where('last_login_at', '>=', now()->subDays(7))->count();
        $newUsers = User::where('created_at', '>=', now()->subDays(7))->count();
        $adminUsers = User::where('is_admin', true)->count();
        
        $recentUsers = User::orderBy('last_login_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'last_login' => $user->last_login_at,
                    'is_admin' => $user->is_admin,
                    'permissions' => $user->permissions
                ];
            });

        return response()->json([
            'stats' => [
                'total_users' => $totalUsers,
                'active_users' => $activeUsers,
                'new_users' => $newUsers,
                'admin_users' => $adminUsers,
            ],
            'recent_users' => $recentUsers
        ]);
    }
} 