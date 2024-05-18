<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'favorited_user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function favorited_user()
    {
        return $this->belongsTo(User::class, 'favorited_user_id');
    }
}
