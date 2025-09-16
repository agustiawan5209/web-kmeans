<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatPengguna extends Model
{

    protected $table = "riwayat_penggunas";
    protected $fillable = [
        'user_id',
        'kluster',
        'nama',
        'jenkel',
        'usia',
        'berat_badan',
        'tinggi_badan',
        'tekanan_sistolik',
        'tekanan_diastolik',
        'riwayat_penyakit',
        'alergi_makanan',
        'hipertensi',
    ];

    protected $casts = [
        'kluster' => 'array',
        'created_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
