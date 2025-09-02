<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Indikator;
use App\Models\Dataset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WebPageController extends Controller
{
    private const BASE_BREADCRUMS = [
        [
            'title' => 'dashboard',
            'href' => '/dashboard',
        ],
        [
            'title' => 'prediksi',
            'href' => '/prediction'
        ]
    ];
    public function index(Request $request)
    {
        $dataset = Dataset::all();
        $kriteria = Indikator::orderBy('id', 'asc')->get();

        $transaction = $dataset->map(function ($item) use ($kriteria) {
            $parameter = $item->parameter;
            // dd($parameter);
            $data = [];
            foreach ($kriteria as $key => $value) {
                $id = $value->id;
                $nilai = array_values(array_filter($parameter, function ($pm) use ($id) {
                    return $pm['indikator_id'] == $id;
                }))[0]['nilai'];

                $data[] = intval($nilai);
            }
            return $data;
        });
        $transactionY = $dataset->map(function ($item) use ($kriteria) {
            $data = $item->label;
            return $data;
        });
        return Inertia::render('guest/prediction/index', [
            'breadcrumb' => self::BASE_BREADCRUMS,
            'titlePage' => 'Prediksi Makanan',
            'transactionX' => $transaction,
            'indikator' => $kriteria,
            'transactionY' => $transactionY,
        ]);
    }
}
