<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'title',
        'image',
        'content',
        'seo_title',
        'seo_desciption',
        'seo_tags',
    ];
}
