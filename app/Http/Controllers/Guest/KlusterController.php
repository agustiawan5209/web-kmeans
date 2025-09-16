<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\ModelStorage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KlusterController extends Controller
{
    public function index()
    {
        $modelStorage = ModelStorage::where('model_name', 'kmeans_nutrition_model')->first();
        if (!$modelStorage) {
            return redirect()->route('guest.dashboard')->with('error', 'Model KMeans belum tersedia. Silakan hubungi admin.');
        }
        return Inertia::render("guest/kluster/index", [
            "kluster" => $modelStorage->model_json,
        ]);
    }

    public function create()
    {
        $modelStorage = ModelStorage::where('model_name', 'kmeans_nutrition_model')->first();
        if (!$modelStorage) {
            return redirect()->route('guest.dashboard')->with('error', 'Model KMeans belum tersedia. Silakan hubungi admin.');
        }

        $riwayat = auth()->user()->riwayatPengguna()->latest()->first();
        return Inertia::render("guest/kluster/klusterview", [
            "kluster" => $modelStorage->model_json,
            'riwayatPengguna' => $riwayat,
        ]);
    }
}
