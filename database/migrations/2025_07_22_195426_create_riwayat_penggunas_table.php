<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('riwayat_penggunas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->json('kluster')->comment('menyimpan hasil kluster');
            $table->string('nama', 100);
            $table->string('jenkel', 100);
            $table->string('usia', 100);
            $table->string('berat_badan', 100);
            $table->string('tinggi_badan', 100);
            $table->string('tekanan_sistolik', 100);
            $table->string('tekanan_diastolik', 100);
            $table->string('hipertensi', 100);
            $table->text('riwayat_penyakit');
            $table->text('alergi_makanan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_penggunas');
    }
};
