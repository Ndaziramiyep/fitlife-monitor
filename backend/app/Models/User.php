<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Laravel\Passport\Contracts\OAuthenticatable;
use App\Models\Content;
use App\Models\BmiHistory;
use App\Models\Activity;

class User extends Authenticatable implements OAuthenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'date_of_birth',
        'gender',
        'height',
        'weight',
        'fitness_goal',
        'is_admin',
        'bmi',
        'bmi_category',
        'last_bmi_calculation',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_of_birth' => 'date',
        'height' => 'decimal:2',
        'weight' => 'decimal:2',
        'permissions' => 'array',
        'bmi' => 'decimal:2',
        'last_bmi_calculation' => 'datetime',
    ];

    protected $visible = [
        'id', 'name', 'email', 'is_admin', 'height', 'weight', 'bmi', 'bmi_category', 'last_bmi_calculation',
    ];

    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }

    public function contents()
    {
        return $this->hasMany(Content::class);
    }

    public function bmiHistory()
    {
        return $this->hasMany(BmiHistory::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
