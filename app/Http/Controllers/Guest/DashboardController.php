<?php

namespace App\Http\Controllers\Guest;

use Inertia\Inertia;
use App\Models\Indikator;
use App\Models\Dataset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public const BASE_JENISRUMPUT_LAUT = [
        'conttoniBasah',
        'conttoniKering',
        'spinosumBasah',
        'spinosumKering',
    ];
    public function dashboard()
    {

        $dataset = Dataset::all();
        $kriteria = Indikator::orderBy('id', 'asc')->get();

        $transactionY = $dataset->map(function ($item) use ($kriteria) {
            $jenis = $item->jenisRumputLaut;
            $data = [];
            foreach ($jenis as $key => $value) {
                $data[$value['nama']] = $value['jumlah'];
            }
            return $data;
        });
        return Inertia::render('guest/dashboard', [
            'baseJenisRumputLaut' => self::BASE_JENISRUMPUT_LAUT,
            'totalDataMakanan' => Dataset::all()->count(),
            'indikator' => Indikator::all()->count(),
            'transactionY' => $transactionY,

        ]);
    }
}
