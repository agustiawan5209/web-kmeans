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
        $menu_data = [
            [
                'menu' => 'Nasi Goreng Tuna',
                'kalori' => 316.90,
                'protein' => 15.20,
                'lemak' => 9.30,
                'karbohidrat' => 44.50,
                'natrium' => 41.7,
                'kalium' => 802.6,
                'kalsium' => 54.80,
                'magnesium' => 52.20
            ],
            [
                'menu' => 'Sari Buah Segar',
                'kalori' => 155.10,
                'protein' => 2.00,
                'lemak' => 0.80,
                'karbohidrat' => 37.70,
                'natrium' => 34.00,
                'kalium' => 522.30,
                'kalsium' => 63.50,
                'magnesium' => 22.00
            ],
            [
                'menu' => 'Singkong Manis',
                'kalori' => 206.70,
                'protein' => 1.10,
                'lemak' => 0.30,
                'karbohidrat' => 51.80,
                'natrium' => 1.80,
                'kalium' => 228.00,
                'kalsium' => 24.50,
                'magnesium' => 10.00
            ],
            [
                'menu' => 'Mi Hokian',
                'kalori' => 305.40,
                'protein' => 9.80,
                'lemak' => 11.80,
                'karbohidrat' => 39.40,
                'natrium' => 77.80,
                'kalium' => 182.80,
                'kalsium' => 62.70,
                'magnesium' => 22.00
            ],
            [
                'menu' => 'Jus Mentimun Jambu',
                'kalori' => 102.20,
                'protein' => 2.10,
                'lemak' => 0.50,
                'karbohidrat' => 25.00,
                'natrium' => 2.50,
                'kalium' => 485.50,
                'kalsium' => 77.00,
                'magnesium' => 25.50
            ],
            [
                'menu' => 'Ketimus Nangka',
                'kalori' => 207.10,
                'protein' => 1.60,
                'lemak' => 1.80,
                'karbohidrat' => 48.30,
                'natrium' => 3.60,
                'kalium' => 262.70,
                'kalsium' => 3.10,
                'magnesium' => 23.00
            ],
            [
                'menu' => 'Nasi Goreng Kuyit',
                'kalori' => 266.20,
                'protein' => 14.30,
                'lemak' => 8.00,
                'karbohidrat' => 33.60,
                'natrium' => 35.00,
                'kalium' => 323.50,
                'kalsium' => 25.70,
                'magnesium' => 35.50
            ],
            [
                'menu' => 'Mix Fruit Juice',
                'kalori' => 122.60,
                'protein' => 2.30,
                'lemak' => 0.40,
                'karbohidrat' => 30.20,
                'natrium' => 37.50,
                'kalium' => 496.10,
                'kalsium' => 78.10,
                'magnesium' => 27.00
            ],
            [
                'menu' => 'Kue Tapioka',
                'kalori' => 236.90,
                'protein' => 0.90,
                'lemak' => 4.90,
                'karbohidrat' => 48.80,
                'natrium' => 4.60,
                'kalium' => 159.80,
                'kalsium' => 48.40,
                'magnesium' => 7.80
            ],
            [
                'menu' => 'Spageti Udang',
                'kalori' => 271.60,
                'protein' => 13.20,
                'lemak' => 8.60,
                'karbohidrat' => 28.30,
                'natrium' => 90.50,
                'kalium' => 104.00,
                'kalsium' => 22.50,
                'magnesium' => 31.50
            ],
            [
                'menu' => 'Jus Belimbing Berembun',
                'kalori' => 122.90,
                'protein' => 2.10,
                'lemak' => 0.80,
                'karbohidrat' => 30.40,
                'natrium' => 3.60,
                'kalium' => 396.50,
                'kalsium' => 59.80,
                'magnesium' => 28.90
            ],
            [
                'menu' => 'Talam Ubi',
                'kalori' => 310.60,
                'protein' => 3.00,
                'lemak' => 3.30,
                'karbohidrat' => 67.50,
                'natrium' => 9.30,
                'kalium' => 262.00,
                'kalsium' => 20.50,
                'magnesium' => 24.40
            ],
            [
                'menu' => 'Orak Arik Bening Soun',
                'kalori' => 333.90,
                'protein' => 7.30,
                'lemak' => 10.60,
                'karbohidrat' => 51.30,
                'natrium' => 89.50,
                'kalium' => 207.00,
                'kalsium' => 53.30,
                'magnesium' => 15.50
            ],
            [
                'menu' => 'Sari Seledri Campur',
                'kalori' => 133.40,
                'protein' => 2.60,
                'lemak' => 1.20,
                'karbohidrat' => 31.90,
                'natrium' => 19.00,
                'kalium' => 544.00,
                'kalsium' => 52.00,
                'magnesium' => 37.00
            ],
            [
                'menu' => 'Talam Nangka',
                'kalori' => 200.60,
                'protein' => 1.70,
                'lemak' => 8.20,
                'karbohidrat' => 32.00,
                'natrium' => 4.30,
                'kalium' => 182.10,
                'kalsium' => 3.80,
                'magnesium' => 18.40
            ],
            [
                'menu' => 'Makaroni Bumbu Merah',
                'kalori' => 230.70,
                'protein' => 6.30,
                'lemak' => 5.90,
                'karbohidrat' => 38.00,
                'natrium' => 18.00,
                'kalium' => 95.80,
                'kalsium' => 16.80,
                'magnesium' => 25.80
            ],
            [
                'menu' => 'Acar Timun',
                'kalori' => 52.20,
                'protein' => 1.40,
                'lemak' => 1.10,
                'karbohidrat' => 11.50,
                'natrium' => 7.10,
                'kalium' => 283.80,
                'kalsium' => 16.90,
                'magnesium' => 18.60
            ],
            [
                'menu' => 'Jus Pepaya Belimbing',
                'kalori' => 130.90,
                'protein' => 3.00,
                'lemak' => 4.10,
                'karbohidrat' => 48.90,
                'natrium' => 19.00,
                'kalium' => 328.50,
                'kalsium' => 60.40,
                'magnesium' => 19.60
            ],
            [
                'menu' => 'Getuk Kacang Hijau',
                'kalori' => 242.20,
                'protein' => 3.00,
                'lemak' => 4.10,
                'karbohidrat' => 49.90,
                'natrium' => 19.00,
                'kalium' => 328.50,
                'kalsium' => 60.40,
                'magnesium' => 19.60
            ],
            [
                'menu' => 'Kwetiau Sambal Rujak',
                'kalori' => 255.00,
                'protein' => 13.80,
                'lemak' => 9.80,
                'karbohidrat' => 29.00,
                'natrium' => 91.30,
                'kalium' => 485.00,
                'kalsium' => 106.50,
                'magnesium' => 54.50
            ],
            [
                'menu' => 'Sari Seledri Mentimun',
                'kalori' => 100.60,
                'protein' => 3.80,
                'lemak' => 1.00,
                'karbohidrat' => 22.20,
                'natrium' => 23.00,
                'kalium' => 717.00,
                'kalsium' => 73.00,
                'magnesium' => 54.00
            ],
            [
                'menu' => 'Lemang Manis Isi Pisang',
                'kalori' => 308.40,
                'protein' => 4.20,
                'lemak' => 3.60,
                'karbohidrat' => 66.70,
                'natrium' => 3.60,
                'kalium' => 292.30,
                'kalsium' => 9.10,
                'magnesium' => 37.50
            ],
            [
                'menu' => 'Mie Rebus Taoge',
                'kalori' => 217.90,
                'protein' => 10.00,
                'lemak' => 9.80,
                'karbohidrat' => 23.90,
                'natrium' => 35.30,
                'kalium' => 175.80,
                'kalsium' => 34.80,
                'magnesium' => 34.00
            ],
            [
                'menu' => 'Sambal Rebus Hijau',
                'kalori' => 37.60,
                'protein' => 1.40,
                'lemak' => 1.80,
                'karbohidrat' => 7.50,
                'natrium' => 3.40,
                'kalium' => 299.00,
                'kalsium' => 20.00,
                'magnesium' => 16.80
            ],
            [
                'menu' => 'Hula Kula',
                'kalori' => 168.10,
                'protein' => 3.50,
                'lemak' => 2.30,
                'karbohidrat' => 37.10,
                'natrium' => 4.50,
                'kalium' => 371.50,
                'kalsium' => 39.80,
                'magnesium' => 50.70
            ],
            [
                'menu' => 'Gemblong Manis',
                'kalori' => 279.20,
                'protein' => 2.50,
                'lemak' => 7.00,
                'karbohidrat' => 52.90,
                'natrium' => 5.20,
                'kalium' => 174.90,
                'kalsium' => 42.40,
                'magnesium' => 50.70
            ],
            [
                'menu' => 'Nasi Ciprat',
                'kalori' => 253.80,
                'protein' => 6.10,
                'lemak' => 5.70,
                'karbohidrat' => 45.70,
                'natrium' => 10.20,
                'kalium' => 405.30,
                'kalsium' => 53.60,
                'magnesium' => 37.80
            ],
            [
                'menu' => 'Ayam Panggang Bumbu Bacem',
                'kalori' => 167.40,
                'protein' => 8.20,
                'lemak' => 7.00,
                'karbohidrat' => 13.00,
                'natrium' => 26.70,
                'kalium' => 104.50,
                'kalsium' => 91.60,
                'magnesium' => 8.20
            ],
            [
                'menu' => 'Sari Buah Tropika',
                'kalori' => 98.00,
                'protein' => 1.60,
                'lemak' => 0.90,
                'karbohidrat' => 18.70,
                'natrium' => 6.00,
                'kalium' => 387.50,
                'kalsium' => 53.00,
                'magnesium' => 31.50
            ],
            [
                'menu' => 'Awuk Manis',
                'kalori' => 175.90,
                'protein' => 2.00,
                'lemak' => 3.50,
                'karbohidrat' => 34.40,
                'natrium' => 2.10,
                'kalium' => 56.10,
                'kalsium' => 3.50,
                'magnesium' => 12.20
            ],
            [
                'menu' => 'Nasi Hijau Harum',
                'kalori' => 265.40,
                'protein' => 11.00,
                'lemak' => 10.70,
                'karbohidrat' => 31.30,
                'natrium' => 78.00,
                'kalium' => 294.00,
                'kalsium' => 102.00,
                'magnesium' => 33.00
            ],
            [
                'menu' => 'Jus Pepaya Kayu Manis',
                'kalori' => 141.70,
                'protein' => 2.00,
                'lemak' => 0.30,
                'karbohidrat' => 36.60,
                'natrium' => 5.30,
                'kalium' => 599.30,
                'kalsium' => 81.80,
                'magnesium' => 26.80
            ],
            [
                'menu' => 'Kue Bugis Isi Kacang Hijau',
                'kalori' => 188.20,
                'protein' => 2.70,
                'lemak' => 3.10,
                'karbohidrat' => 37.80,
                'natrium' => 8.00,
                'kalium' => 130.30,
                'kalsium' => 18.30,
                'magnesium' => 21.40
            ],
            [
                'menu' => 'Nasi Putih 100g',
                'kalori' => 129.80,
                'protein' => 2.40,
                'lemak' => 0.20,
                'karbohidrat' => 28.60,
                'natrium' => 0.00,
                'kalium' => 29.00,
                'kalsium' => 3.00,
                'magnesium' => 13.00
            ],
            [
                'menu' => 'Telur Puyuh Bumbu Kuning',
                'kalori' => 137.70,
                'protein' => 6.40,
                'lemak' => 9.90,
                'karbohidrat' => 5.70,
                'natrium' => 73.10,
                'kalium' => 111.10,
                'kalsium' => 32.00,
                'magnesium' => 8.50
            ],
            [
                'menu' => 'Tempe Kukus Cabai Hijau',
                'kalori' => 147.40,
                'protein' => 9.90,
                'lemak' => 7.00,
                'karbohidrat' => 13.80,
                'natrium' => 7.50,
                'kalium' => 294.60,
                'kalsium' => 49.00,
                'magnesium' => 40.50
            ],
            [
                'menu' => 'Sayur Rica Rodoh',
                'kalori' => 103.60,
                'protein' => 2.90,
                'lemak' => 3.80,
                'karbohidrat' => 18.00,
                'natrium' => 2.80,
                'kalium' => 405.30,
                'kalsium' => 49.20,
                'magnesium' => 34.00
            ],
            [
                'menu' => 'Apel 150g',
                'kalori' => 88.60,
                'protein' => 0.30,
                'lemak' => 0.60,
                'karbohidrat' => 23.00,
                'natrium' => 0.00,
                'kalium' => 172.50,
                'kalsium' => 10.50,
                'magnesium' => 7.50
            ],
            [
                'menu' => 'Ikan Panggang Siram Acar',
                'kalori' => 114.70,
                'protein' => 10.90,
                'lemak' => 6.20,
                'karbohidrat' => 3.90,
                'natrium' => 28.70,
                'kalium' => 252.00,
                'kalsium' => 24.80,
                'magnesium' => 45.00
            ],
            [
                'menu' => 'Tumis Tahu Kentang Seledri',
                'kalori' => 136.20,
                'protein' => 5.10,
                'lemak' => 8.40,
                'karbohidrat' => 11.80,
                'natrium' => 6.00,
                'kalium' => 256.00,
                'kalsium' => 55.00,
                'magnesium' => 64.00
            ],
            [
                'menu' => 'Sayur bobor',
                'kalori' => 139.10,
                'protein' => 4.10,
                'lemak' => 5.90,
                'karbohidrat' => 22.00,
                'natrium' => 17.60,
                'kalium' => 468.10,
                'kalsium' => 110.50,
                'magnesium' => 52.20
            ],
            [
                'menu' => 'Belimbing 150g',
                'kalori' => 48.00,
                'protein' => 0.90,
                'lemak' => 0.60,
                'karbohidrat' => 10.80,
                'natrium' => 3.00,
                'kalium' => 174.00,
                'kalsium' => 12.00,
                'magnesium' => 16.50
            ],
            [
                'menu' => 'Teri Basah Goreng Renyah',
                'kalori' => 153.60,
                'protein' => 12.50,
                'lemak' => 9.30,
                'karbohidrat' => 4.80,
                'natrium' => 40.00,
                'kalium' => 248.70,
                'kalsium' => 29.70,
                'magnesium' => 45.70
            ],
            [
                'menu' => 'Tempe Pesmol',
                'kalori' => 140.10,
                'protein' => 9.70,
                'lemak' => 6.90,
                'karbohidrat' => 12.20,
                'natrium' => 3.50,
                'kalium' => 219.60,
                'kalsium' => 50.00,
                'magnesium' => 37.80
            ],
            [
                'menu' => 'Urap Megono',
                'kalori' => 119.40,
                'protein' => 3.70,
                'lemak' => 4.40,
                'karbohidrat' => 19.30,
                'natrium' => 28.00,
                'kalium' => 387.50,
                'kalsium' => 93.80,
                'magnesium' => 39.20
            ],
            [
                'menu' => 'Pepaya 100g',
                'kalori' => 58.40,
                'protein' => 0.90,
                'lemak' => 0.20,
                'karbohidrat' => 14.70,
                'natrium' => 4.50,
                'kalium' => 385.50,
                'kalsium' => 93.80,
                'magnesium' => 39.20
            ],
            [
                'menu' => 'Tumis Ikan Tongkol',
                'kalori' => 98.60,
                'protein' => 12.00,
                'lemak' => 5.50,
                'karbohidrat' => 0.00,
                'natrium' => 19.00,
                'kalium' => 95.00,
                'kalsium' => 8.50,
                'magnesium' => 11.00
            ],
            [
                'menu' => 'Tahu Bumbu Kukus',
                'kalori' => 77.70,
                'protein' => 7.60,
                'lemak' => 4.70,
                'karbohidrat' => 2.70,
                'natrium' => 19.90,
                'kalium' => 158.90,
                'kalsium' => 85.00,
                'magnesium' => 81.00
            ],
            [
                'menu' => 'Kangkung Bumbu Kare',
                'kalori' => 152.70,
                'protein' => 3.50,
                'lemak' => 10.50,
                'karbohidrat' => 14.90,
                'natrium' => 29.30,
                'kalium' => 447.50,
                'kalsium' => 115.80,
                'magnesium' => 47.30
            ],
            [
                'menu' => 'Nanas 100g',
                'kalori' => 49.00,
                'protein' => 0.40,
                'lemak' => 0.40,
                'karbohidrat' => 12.40,
                'natrium' => 1.00,
                'kalium' => 113.00,
                'kalsium' => 7.00,
                'magnesium' => 14.00
            ],
            [
                'menu' => 'Brengkes Patin',
                'kalori' => 103.70,
                'protein' => 8.50,
                'lemak' => 6.30,
                'karbohidrat' => 3.50,
                'natrium' => 21.50,
                'kalium' => 173.10,
                'kalsium' => 15.50,
                'magnesium' => 0.00
            ],
            [
                'menu' => 'Bronkos Kacang Tanah',
                'kalori' => 138.80,
                'protein' => 5.10,
                'lemak' => 5.30,
                'karbohidrat' => 19.20,
                'natrium' => 5.90,
                'kalium' => 283.60,
                'kalsium' => 21.00,
                'magnesium' => 30.30
            ],
            [
                'menu' => 'Sayur Siram Bumbu tumis',
                'kalori' => 102.30,
                'protein' => 5.20,
                'lemak' => 6.20,
                'karbohidrat' => 10.30,
                'natrium' => 14.10,
                'kalium' => 537.60,
                'kalsium' => 160.10,
                'magnesium' => 89.00
            ],
            [
                'menu' => 'Pisang Ambon Sunrise',
                'kalori' => 92.00,
                'protein' => 1.00,
                'lemak' => 0.50,
                'karbohidrat' => 23.40,
                'natrium' => 1.00,
                'kalium' => 396.00,
                'kalsium' => 6.00,
                'magnesium' => 29.00
            ],
            [
                'menu' => 'Pepes tongkol Sambal Dabu-Dabu',
                'kalori' => 115.10,
                'protein' => 11.70,
                'lemak' => 1.70,
                'karbohidrat' => 17.10,
                'natrium' => 26.80,
                'kalium' => 467.80,
                'kalsium' => 32.30,
                'magnesium' => 31.40
            ],
            [
                'menu' => 'Oseng tahu Tomat',
                'kalori' => 138.80,
                'protein' => 5.10,
                'lemak' => 5.30,
                'karbohidrat' => 19.20,
                'natrium' => 5.90,
                'kalium' => 283.60,
                'kalsium' => 21.00,
                'magnesium' => 30.30
            ],
            [
                'menu' => 'Asem-Asem Kangkung',
                'kalori' => 73.20,
                'protein' => 4.60,
                'lemak' => 5.40,
                'karbohidrat' => 4.20,
                'natrium' => 32.00,
                'kalium' => 404.00,
                'kalsium' => 148.00,
                'magnesium' => 30.00
            ],
            [
                'menu' => 'Mangga 150g',
                'kalori' => 97.50,
                'protein' => 0.80,
                'lemak' => 0.50,
                'karbohidrat' => 25.50,
                'natrium' => 3.00,
                'kalium' => 234.00,
                'kalsium' => 15.00,
                'magnesium' => 13.50
            ],
            [
                'menu' => 'Telor Ceplok Air Kuning',
                'kalori' => 145.30,
                'protein' => 7.40,
                'lemak' => 9.20,
                'karbohidrat' => 9.70,
                'natrium' => 80.50,
                'kalium' => 256.60,
                'kalsium' => 43.70,
                'magnesium' => 18.60
            ],
            [
                'menu' => 'Tempe Masak Wijen',
                'kalori' => 156.00,
                'protein' => 10.50,
                'lemak' => 9.40,
                'karbohidrat' => 10.20,
                'natrium' => 4.20,
                'kalium' => 221.90,
                'kalsium' => 97.30,
                'magnesium' => 52.80
            ],
            [
                'menu' => 'Daun Singkong Bumbu Iris',
                'kalori' => 68.40,
                'protein' => 0.90,
                'lemak' => 5.60,
                'karbohidrat' => 4.80,
                'natrium' => 3.00,
                'kalium' => 137.60,
                'kalsium' => 53.00,
                'magnesium' => 15.50
            ],
            [
                'menu' => 'Jeruk Pontianak 150g',
                'kalori' => 70.60,
                'protein' => 1.30,
                'lemak' => 0.20,
                'karbohidrat' => 17.70,
                'natrium' => 0.00,
                'kalium' => 271.50,
                'kalsium' => 60.00,
                'magnesium' => 15.00
            ],
            [
                'menu' => 'Ayam Kalasan',
                'kalori' => 136.10,
                'protein' => 9.50,
                'lemak' => 6.90,
                'karbohidrat' => 8.30,
                'natrium' => 28.40,
                'kalium' => 28.40,
                'kalsium' => 73.40,
                'magnesium' => 8.10
            ],
            [
                'menu' => 'Sambal Mentah Bawang Bombai',
                'kalori' => 41.30,
                'protein' => 1.60,
                'lemak' => 1.20,
                'karbohidrat' => 8.40,
                'natrium' => 10.80,
                'kalium' => 339.30,
                'kalsium' => 14.60,
                'magnesium' => 19.70
            ],
            [
                'menu' => 'Gadon Tahu Jamur',
                'kalori' => 100.80,
                'protein' => 8.50,
                'lemak' => 5.00,
                'karbohidrat' => 7.80,
                'natrium' => 18.90,
                'kalium' => 293.00,
                'kalsium' => 87.60,
                'magnesium' => 85.30
            ],
            [
                'menu' => 'Tumis Buncis Wortel Bintik',
                'kalori' => 94.90,
                'protein' => 2.00,
                'lemak' => 3.60,
                'karbohidrat' => 16.20,
                'natrium' => 26.00,
                'kalium' => 304.60,
                'kalsium' => 22.30,
                'magnesium' => 23.00
            ],
            [
                'menu' => 'Semangka 150g',
                'kalori' => 57.40,
                'protein' => 0.90,
                'lemak' => 0.30,
                'karbohidrat' => 12.40,
                'natrium' => 1.50,
                'kalium' => 237.00,
                'kalsium' => 16.50,
                'magnesium' => 4.50
            ],
            [
                'menu' => 'Pepes Bandeng Presto',
                'kalori' => 59.30,
                'protein' => 7.60,
                'lemak' => 1.20,
                'karbohidrat' => 4.90,
                'natrium' => 20.40,
                'kalium' => 195.20,
                'kalsium' => 9.70,
                'magnesium' => 12.60
            ],
            [
                'menu' => 'Tahu Bumbu Merah',
                'kalori' => 108.70,
                'protein' => 6.10,
                'lemak' => 9.60,
                'karbohidrat' => 1.40,
                'natrium' => 5.30,
                'kalium' => 90.80,
                'kalsium' => 78.80,
                'magnesium' => 77.30
            ],
            [
                'menu' => 'Bening Bayam taoge',
                'kalori' => 59.90,
                'protein' => 4.70,
                'lemak' => 1.10,
                'karbohidrat' => 10.80,
                'natrium' => 12.30,
                'kalium' => 528.60,
                'kalsium' => 168.00,
                'magnesium' => 58.30
            ],
            [
                'menu' => 'Tuna Bakar Bumbu Bali',
                'kalori' => 113.00,
                'protein' => 12.10,
                'lemak' => 5.50,
                'karbohidrat' => 3.90,
                'natrium' => 19.20,
                'kalium' => 108.90,
                'kalsium' => 11.10,
                'magnesium' => 11.80
            ],
            [
                'menu' => 'Tahu Siksa',
                'kalori' => 156.20,
                'protein' => 6.60,
                'lemak' => 11.80,
                'karbohidrat' => 8.20,
                'natrium' => 5.40,
                'kalium' => 77.30,
                'kalsium' => 81.90,
                'magnesium' => 52.60
            ],
            [
                'menu' => 'Kacang Panjang Bumbu Kuning',
                'kalori' => 85.30,
                'protein' => 2.70,
                'lemak' => 3.30,
                'karbohidrat' => 15.00,
                'natrium' => 9.50,
                'kalium' => 457.40,
                'kalsium' => 45.20,
                'magnesium' => 33.80
            ],
            [
                'menu' => 'Pir 150g',
                'kalori' => 52.30,
                'protein' => 0.50,
                'lemak' => 0.30,
                'karbohidrat' => 12.40,
                'natrium' => 2.00,
                'kalium' => 125.00,
                'kalsium' => 9.00,
                'magnesium' => 7.00
            ],
            [
                'menu' => 'Susu Hangat 1 Gelas',
                'kalori' => 131.90,
                'protein' => 6.40,
                'lemak' => 7.80,
                'karbohidrat' => 9.60,
                'natrium' => 110.00,
                'kalium' => 280.00,
                'kalsium' => 230.00,
                'magnesium' => 22.00
            ],

            [
                'menu' => 'Sup Buah Tropical',
                'kalori' => 252.80,
                'protein' => 2.80,
                'lemak' => 2.90,
                'karbohidrat' => 55.60,
                'natrium' => 36.90,
                'kalium' => 431.60,
                'kalsium' => 109.60,
                'magnesium' => 24.40
            ],
            [
                'menu' => 'Pisang Bakar Saus Manis',
                'kalori' => 304.90,
                'protein' => 1.20,
                'lemak' => 5.30,
                'karbohidrat' => 69.50,
                'natrium' => 11.50,
                'kalium' => 732.40,
                'kalsium' => 11.60,
                'magnesium' => 50.90
            ],
            [
                'menu' => 'Sup Buah Serut',
                'kalori' => 116.80,
                'protein' => 3.60,
                'lemak' => 2.50,
                'karbohidrat' => 21.30,
                'natrium' => 33.30,
                'kalium' => 491.10,
                'kalsium' => 108.70,
                'magnesium' => 28.30
            ],
            [
                'menu' => 'Asinan Bengkuang Nanas',
                'kalori' => 165.30,
                'protein' => 2.50,
                'lemak' => 0.70,
                'karbohidrat' => 40.70,
                'natrium' => 5.60,
                'kalium' => 363.30,
                'kalsium' => 40.10,
                'magnesium' => 30.50
            ],
            [
                'menu' => 'Mentimun Serut',
                'kalori' => 148.20,
                'protein' => 1.80,
                'lemak' => 0.60,
                'karbohidrat' => 35.80,
                'natrium' => 6.10,
                'kalium' => 403.80,
                'kalsium' => 34.60,
                'magnesium' => 27.00
            ],
            [
                'menu' => 'Rujak Jeruk Bali',
                'kalori' => 160.90,
                'protein' => 1.40,
                'lemak' => 1.00,
                'karbohidrat' => 41.30,
                'natrium' => 8.70,
                'kalium' => 350.30,
                'kalsium' => 84.60,
                'magnesium' => 23.30
            ],
            [
                'menu' => 'Pisang Panggang Saus Kurma 100g',
                'kalori' => 255.30,
                'protein' => 2.30,
                'lemak' => 0.40,
                'karbohidrat' => 68.00,
                'natrium' => 10.50,
                'kalium' => 814.00,
                'kalsium' => 25.00,
                'magnesium' => 47.50
            ],
            [
                'menu' => 'Setup Apel Merah',
                'kalori' => 127.20,
                'protein' => 0.30,
                'lemak' => 0.60,
                'karbohidrat' => 32.90,
                'natrium' => 0.10,
                'kalium' => 172.70,
                'kalsium' => 10.60,
                'magnesium' => 7.50
            ],
            [
                'menu' => 'Rujak Pepaya Alpukat',
                'kalori' => 235.50,
                'protein' => 5.70,
                'lemak' => 6.40,
                'karbohidrat' => 42.40,
                'natrium' => 13.80,
                'kalium' => 686.00,
                'kalsium' => 78.80,
                'magnesium' => 60.50
            ],
            [
                'menu' => 'Setup Jambu Biji',
                'kalori' => 140.50,
                'protein' => 1.60,
                'lemak' => 1.20,
                'karbohidrat' => 33.80,
                'natrium' => 6.10,
                'kalium' => 568.20,
                'kalsium' => 40.10,
                'magnesium' => 20.00
            ]


        ];

        foreach ($menu_data as $key => $value) {
            $parameter = [
                ["nilai" => $value['kalori'], "indikator_id" => 1],
                ["nilai" => $value['protein'], "indikator_id" => 2],
                ["nilai" => $value['lemak'], "indikator_id" => 3],
                ["nilai" => $value['karbohidrat'], "indikator_id" => 4],
                ["nilai" => $value['natrium'], "indikator_id" => 5],
                ["nilai" => $value['kalium'], "indikator_id" => 6],
                ["nilai" => $value['kalsium'], "indikator_id" => 7],
                ["nilai" => $value['magnesium'], "indikator_id" => 8]
            ];
            Dataset::create([
                "label" => $value['menu'],
                "parameter" => $parameter,
            ]);
        }
    }
}
