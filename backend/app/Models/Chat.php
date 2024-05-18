<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chat extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'document_id',
        'small_id',
        'large_id',
        'target_small_id',
        'target_large_id',
        'small_seen_id',
        'large_seen_id',
    ];

    public function small_user()
    {
        return $this->belongsTo(User::class, 'small_id');
    }

    public function large_user()
    {
        return $this->belongsTo(User::class, 'large_id');
    }

    public function target_small_user()
    {
        return $this->belongsTo(User::class, 'target_small_id');
    }

    public function target_large_user()
    {
        return $this->belongsTo(User::class, 'target_large_id');
    }
}
