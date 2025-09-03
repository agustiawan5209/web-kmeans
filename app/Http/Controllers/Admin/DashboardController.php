<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Indikator;
use App\Models\Dataset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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

        return Inertia::render('dashboard', [
            'baseJenisRumputLaut' => self::BASE_JENISRUMPUT_LAUT,
            'totalDataMakanan' => Dataset::all()->count(),
            'indikator' => Indikator::all()->count(),

        ]);
    }
}
