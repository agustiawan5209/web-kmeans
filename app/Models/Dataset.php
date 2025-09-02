<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dataset extends Model
{
    /** @use HasFactory<\Database\Factories\DatasetFactory> */
    use HasFactory;


    protected $fillable = [
        "label",
        "parameter",
        "keterangan",
    ];

    protected $casts = [
        "parameter" => "array",
    ];
}
