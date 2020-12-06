<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BadDomain extends Model
{
    use HasFactory;

    protected $table = 'bad_domains';
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];

}
