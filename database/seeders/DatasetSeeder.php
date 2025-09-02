<?php

namespace Database\Seeders;

use App\Models\Dataset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatasetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        foreach ($bulan as $key => $value) {
            Dataset::create([
                "label" => fake()->numberBetween(1000, 5000),
                "parameter" => [
                    ["nilai" => fake()->numberBetween(100, 500), "indikator_id" => 1],
                    ["nilai" => fake()->numberBetween(100, 500), "indikator_id" => 2],
                    ["nilai" => fake()->numberBetween(300, 600), "indikator_id" => 3],
                    ["nilai" => fake()->numberBetween(300, 600), "indikator_id" => 4],
                    ["nilai" => fake()->numberBetween(100, 300), "indikator_id" => 5],
                    ["nilai" => fake()->numberBetween(130, 300), "indikator_id" => 6],
                    ["nilai" => fake()->numberBetween(28, 35), "indikator_id" => 7],
                    ["nilai" => fake()->numberBetween(28, 35), "indikator_id" => 8]
                ],

            ]);
        }
    }
}
