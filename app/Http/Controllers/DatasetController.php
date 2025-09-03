<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Indikator;
use App\Models\Dataset;
use Illuminate\Support\Facades\App;
use App\Http\Requests\StoreDatasetRequest;
use App\Http\Requests\UpdateDatasetRequest;

class DatasetController extends Controller
{
    private const BASE_BREADCRUMB = [
        [
            'title' => 'dashboard',
            'href' => '/dashboard',
        ],
        [
            'title' => 'hasil dataset',
            'href' => '/admin/hasil-dataset/',
        ],
    ];
    public const BASE_JENISRUMPUT_LAUT = [
        ['nama' => 'eucheuma_conttoni_basah', 'jumlah' => 500],
        ['nama' => 'eucheuma_conttoni_kering', 'jumlah' => 500],
        ['nama' => 'eucheuma_spinosum_basah', 'jumlah' => 500],
        ['nama' => 'eucheuma_spinosum_kering', 'jumlah' => 500],
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataset = Dataset::orderBy('id', 'desc')->paginate(10);

        return Inertia::render("admin/dataset/index", [
            "dataset" => $dataset,
            'breadcrumb' => self::BASE_BREADCRUMB,
            'titlePage' => 'Dataset',
            'indikator' => Indikator::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/dataset/create', [
            'indikator' => Indikator::all(),
            'breadcrumb' => array_merge(self::BASE_BREADCRUMB, [
                ['title' => 'tambah', 'href' => '/admin/hasil-dataset/create'],
            ]),
            'jenisRumputLaut' => self::BASE_JENISRUMPUT_LAUT,
            'titlePage' => 'Tambah Dataset',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDatasetRequest $request)
    {
        $data =  [
            "bulan" => $request->bulan,
            "desa" => $request->desa,
            "kecamatan" => $request->kecamatan,
            "tahun" => $request->tahun,
            "total_dataset" => $request->total_dataset,
            "jenisRumputLaut" =>  $request->jenisRumputLaut,
            "parameter" => $request->parameter,
            "keterangan" => "TEST",
        ];
        $databaseHelper = App::make('databaseHelper');
        return $databaseHelper(
            operation: fn() => Dataset::create($data),
            successMessage: 'Dataset Berhasil Ditambahkan!',
            redirectRoute: 'admin.dataset.index'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Dataset $dataset)
    {
        return Inertia::render('admin/dataset/show', [
            'dataset' => $dataset,
            'indikator' => Indikator::all(),
            'breadcrumb' => array_merge(self::BASE_BREADCRUMB, [
                [
                    'title' => 'detail',
                    'href' => '/admin/hasil-dataset/detail/show' . $dataset->id,
                ]
            ]),
            'titlePage' => 'Detail',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dataset $dataset)
    {
        return Inertia::render('admin/dataset/edit', [
            'dataset' => $dataset,
            'indikator' => Indikator::all(),
            'breadcrumb' => array_merge(self::BASE_BREADCRUMB, [
                ['title' => 'edit', 'href' => '/admin/hasil-dataset/edit/' . $dataset->id],
            ]),
            'titlePage' => 'Edit Dataset',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDatasetRequest $request, Dataset $dataset)
    {
        $data =  [
            "bulan" => $request->bulan,
            "tahun" => $request->tahun,
            "desa" => $request->desa,
            "kecamatan" => $request->kecamatan,
            "total_dataset" => $request->total_dataset,
            "jenisRumputLaut" =>  $request->jenisRumputLaut,
            "parameter" => $request->parameter,
            "keterangan" => "TEST",
        ];
        $databaseHelper = App::make('databaseHelper');
        return $databaseHelper(
            operation: fn() => $dataset->update($data),
            successMessage: 'Dataset Berhasil Diperbarui!',
            redirectRoute: 'admin.dataset.index'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dataset $dataset)
    {
        $databaseHelper = App::make('databaseHelper');
        return $databaseHelper(
            operation: fn() => $dataset->delete(),
            successMessage: 'Dataset Berhasil Dihapus!',
            redirectRoute: 'admin.dataset.index'
        );
    }
}
