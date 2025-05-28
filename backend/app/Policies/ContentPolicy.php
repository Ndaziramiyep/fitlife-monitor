<?php

namespace App\Policies;

use App\Models\Content;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ContentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Users can view their own content
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Content $content): bool
    {
        // Users can view their own content, admins can view all content
        return $user->is_admin || $user->id === $content->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Authenticated users can create content
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Content $content): bool
    {
        // Users can update their own content, admins can update all content
        return $user->is_admin || $user->id === $content->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Content $content): bool
    {
        // Users can delete their own content, admins can delete all content
        return $user->is_admin || $user->id === $content->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Content $content): bool
    {
        //
        return $user->is_admin;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Content $content): bool
    {
        //
        return $user->is_admin;
    }

    // Allow admins to bypass policies
    public function before(User $user, string $ability): bool|null
    {
        if ($user->is_admin) {
            return true;
        }

        return null;
    }
} 