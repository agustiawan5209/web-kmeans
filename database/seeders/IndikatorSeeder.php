<?php

namespace Database\Seeders;

use App\Models\Indikator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndikatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $indikators = array(
            array(

                "nama" => "Kalori",
                "keterangan" => "Kalori",
                // "attribut" => [
                //     [
                //         "batas" => "150",
                //         "operator" => "<",
                //         "nilai" => "potensi_kecil",
                //     ],
                //     ["batas" => "288", "operator" => "<=", "nilai" => "potensi_siang",],
                //     ["batas" => "288", "operator" => ">", "nilai" => "potensi_malam"]
                // ],

            ),
            array(

                "nama" => "Protein",
                "keterangan" => "Protein",
                // "attribut" => [
                //     ["batas" => "150", "operator" => "<", "nilai" => "luas_pagi",],
                //     ["batas" => "250", "operator" => "<=", "nilai" => "luas_siang",],
                //     ["batas" => "250", "operator" => ">", "nilai" => "luas_malam"]
                // ],

            ),
            array(

                "nama" => "Lemak",
                "keterangan" => "Lemak",
                // "attribut" => [
                //     ["batas" => "200", "operator" => "<", "nilai" => "conttoni_pagi",],
                //     ["batas" => "478", "operator" => "<=", "nilai" => "conttoni_siang",],
                //     ["batas" => "478", "operator" => ">", "nilai" => "conttoni_malam"]
                // ],

            ),
            array(

                "nama" => "Karbohidrat",
                "keterangan" => "Karbohidrat",
                // "attribut" => [
                //     ["batas" => "100", "operator" => "<", "nilai" => "spinosom_pagi",],
                //     ["batas" => "227", "operator" => "<=", "nilai" => "spinosom_siang",],
                //     ["batas" => "227", "operator" => ">", "nilai" => "spinosom_malam"]
                // ],

            ),
            array(

                "nama" => "Natrium",
                "keterangan" => "Natrium",
                // "attribut" => [
                //     ["batas" => "50", "operator" => "<", "nilai" => "bentangan_pagi"],
                //     ["batas" => "150", "operator" => "<=", "nilai" => "bentangan_siang"],
                //     ["batas" => "150", "operator" => ">", "nilai" => "bentangan_malam"]
                // ],

            ),
            array(

                "nama" => "Kalium",
                "keterangan" => "Kalium",
                // "attribut" => [
                //     ["batas" => "130", "operator" => "<", "nilai" => "petani_pagi"],
                //     ["batas" => "237", "operator" => "<=", "nilai" => "petani_siang"],
                //     ["batas" => "237", "operator" => ">", "nilai" => "petani_malam"]
                // ],

            ),
            array(

                "nama" => "Kalsium",
                "keterangan" => "Kalsium",
                // "attribut" => [
                //     ["batas" => "25", "operator" => "<", "nilai" => "suhu_pagi"],
                //     ["batas" => "29", "operator" => "<=", "nilai" => "suhu_siang"],
                //     ["batas" => "29", "operator" => ">", "nilai" => "suhu_malam"]
                // ],

            ),
            array(

                "nama" => "Magnesium",
                "keterangan" => "Magnesium",
                // "attribut" => [
                //     ["batas" => "26", "operator" => "<", "nilai" => "salinitas_pagi"],
                //     ["batas" => "33", "operator" => "<=", "nilai" => "salinitas_siang"],
                //     ["batas" => "33", "operator" => ">", "nilai" => "salinitas_malam"]
                // ],
            ),
        );



        foreach ($indikators as $value) {
            Indikator::create([
                'nama' => $value['nama'],
                'keterangan' => $value['keterangan'],
                // 'attribut' => $value['attribut'],
            ]);
        }
    }
}
