<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    use HasFactory;

    const UNIQUE_KEYS = [
        'ua',
        'ip',
        'ref',
        'param1'
    ];

    protected $table = 'clicks';

    public $timestamps = false;

    protected $fillable = [
        'ua',
        'ip',
        'ref',
        'param1',
        'param2',
    ];



}
