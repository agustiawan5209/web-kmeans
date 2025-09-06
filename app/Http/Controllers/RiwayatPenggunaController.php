<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\RiwayatPengguna;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class RiwayatPenggunaController extends Controller
{
    private const BASE_BREADCRUMB = [
        [
            'title' => 'dashboard',
            'href' => '/dashboard',
        ],
        [
            'title' => 'riwayat pengguna',
            'href' => '/admin/riwayat/',
        ],
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("admin/riwayatPengguna/index", [
            "riwayatPengguna" => RiwayatPengguna::with(['user'])->paginate(10),
            'breadcrumb' => self::BASE_BREADCRUMB,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "nama" => "required",
            "jenkel" => "required",
        ]);
        RiwayatPengguna::create([
            "user_id" => Auth::user()->id,
            "user" => Auth::user(),
            // "kluster" => $request->kluster,
            "nama" => $request->nama,
            "jenkel" => $request->jenkel,
            "usia" => $request->usia,
            "berat_badan" => $request->beratBadan,
            "tinggi_badan" => $request->tinggiBadan,
            "tekanan_sistolik" => $request->tekananSistolik,
            "tekanan_diastolik" => $request->tekananDiastolik,
            "riwayat_penyakit" => $request->riwayatPenyakit,
            "alergi_makanan" => $request->alergiMakanan,
            "hipertensi" => $request->hipertensi,
        ]);

        return redirect()->route('user.form.view')->with('success', 'Data Berhasil Disimpan!');
    }

    public function show(RiwayatPengguna $riwayatPengguna)
    {
        $riwayatPengguna->load(['user']);
        return Inertia::render("admin/riwayatPengguna/show", [
            "riwayatPengguna" => $riwayatPengguna,
            'breadcrumb' => array_merge(self::BASE_BREADCRUMB, [
                [
                    'title' => 'detail',
                    'href' => 'admin/riwayat/detail/' . $riwayatPengguna->id,
                ]
            ]),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RiwayatPengguna $riwayatPengguna)
    {
        $databaseHelper = App::make('databaseHelper');
        return $databaseHelper(
            operation: fn() => $riwayatPengguna->delete(),
            successMessage: 'Riwayat Berhasil Di Hapus!',
            redirectRoute: 'admin.riwayatPengguna.index'
        );
    }
}
