<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StripePlan extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ip_monthly_id',
        'ip_monthly_price',
        'ip_quarterly_id',
        'ip_quarterly_price',
        'ip_yearly_id',
        'ip_yearly_price',
        'ag_monthly_id',
        'ag_monthly_price',
        'ag_quarterly_id',
        'ag_quarterly_price',
        'ag_yearly_id',
        'ag_yearly_price',
    ];
}
