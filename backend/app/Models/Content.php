<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'body',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
