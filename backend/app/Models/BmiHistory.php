<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BmiHistory extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'bmi',
        'category',
        'height',
        'weight',
        'last_calculated', // Assuming this column exists based on usage
    ];

    /**
     * Get the user that owns the BMI history entry.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 