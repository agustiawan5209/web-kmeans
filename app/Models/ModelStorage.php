<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelStorage extends Model
{
    /** @use HasFactory<\Database\Factories\ModelStorageFactory> */
    use HasFactory;

    protected $fillable = [
        'model_name',
        'model_json',
    ];
    protected $casts = [
        'model_json' => 'array'
    ];
}
