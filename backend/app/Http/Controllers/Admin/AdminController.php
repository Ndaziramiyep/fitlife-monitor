<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Passport\Token;

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