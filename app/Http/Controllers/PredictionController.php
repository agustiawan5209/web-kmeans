<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PredictionController extends Controller
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
        return Inertia::render('prediction/index', [
            'breadcrumb' => self::BASE_BREADCRUMS,
            'titlePage' => 'RekomendasiMakanan',
        ]);
    }
}
