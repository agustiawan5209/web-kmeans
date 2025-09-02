<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Dataset;
use App\Models\Indikator;
use Illuminate\Http\Request;

class KmeansController extends Controller
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

        $transactionNumerical = $dataset->map(function ($item) use ($kriteria) {
            $parameter = $item->parameter;
            // dd($parameter);
            $data = [];
            foreach ($kriteria as $key => $value) {
                $id = $value->id;
                $nilai = array_values(array_filter($parameter, function ($pm) use ($id) {
                    return $pm['indikator_id'] == $id;
                }))[0]['nilai'];

                $rules = round($nilai);

                $data[$id] = $rules;
            }
            return array_values($data);
        });
        // dd($transactionNumerical);
        return Inertia::render('kmeans/index', [
            'breadcrumb' => self::BASE_BREADCRUMS,
            'titlePage' => 'K-means Makanan',
            'transaksiMakanan' => $this->setTransaction(),
            'transactionNumerical' => $transactionNumerical,
            'kriteria' => Indikator::select(['id', 'nama'])->get(),
        ]);
    }
    public function setTransaction()
    {
        $dataset = Dataset::all();
        $kriteria = Indikator::orderBy('id', 'asc')->get();

        return $dataset->map(function ($item) use ($kriteria) {
            $parameter = $item->parameter;
            $jenis = $item->jenisRumputLaut;
            // dd($parameter);
            $data = [];
            foreach ($kriteria as $key => $value) {
                $id = $value->id;
                $nilai = array_values(array_filter($parameter, function ($pm) use ($id) {
                    return $pm['indikator_id'] == $id;
                }))[0]['nilai'];

                $rules = $nilai;

                $data[$id] = $rules;
            }
            return array_values($data);
        });
    }
}
