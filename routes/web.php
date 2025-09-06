<?php

use App\Http\Controllers\KmeansController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndikatorController;
use App\Http\Controllers\Web\WebPageController;
use App\Http\Controllers\ModelStorageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\DatasetController;
use App\Http\Controllers\Guest\DashboardController as GuestDashboardController;
use App\Http\Controllers\Guest\KlusterController;
use App\Http\Controllers\Guest\RiwayatPrediksiController;
use App\Http\Controllers\RiwayatPenggunaController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'role:admin|super_admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::group(['prefix' => 'indikator', 'as' => 'indikator.'], function () {
            Route::controller(IndikatorController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{indikator}/edit', 'edit')->name('edit');
                Route::put('/{indikator}', 'update')->name('update');
                Route::delete('/{indikator}', 'destroy')->name('destroy');
            });
        });


        Route::group(['prefix' => 'dataset', 'as' => 'dataset.'], function () {
            Route::controller(DatasetController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{dataset}/show', 'show')->name('show');
                Route::get('/{dataset}/edit', 'edit')->name('edit');
                Route::put('/{dataset}', 'update')->name('update');
                Route::delete('/{dataset}', 'destroy')->name('destroy');
            });
        });

        // Riwayat Pengguna
        Route::group(['prefix' => 'riwayat', 'as' => 'riwayatPengguna.'], function () {
            Route::get('/', [RiwayatPenggunaController::class, 'index'])->name('index');
            Route::get('/detail/{riwayatPengguna}', [RiwayatPenggunaController::class, 'show'])->name('show');
            Route::delete('/destroy/{riwayatPengguna}', [RiwayatPenggunaController::class, 'destroy'])->name('destroy');
        });
    });

    Route::group(['prefix' => 'kmeans', 'as' => 'kmeans.'], function () {
        Route::controller(KmeansController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Router Pengguna
Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::group(['as' => 'user.'], function () {

        Route::get('user/dashboard', [GuestDashboardController::class, 'dashboard'])->name('dashboard');

        Route::controller(KlusterController::class)->group(function () {
            Route::get('/form/rekomendasi', 'index')->name('form.prediksi');
            Route::get('/hasil/rekomendasi', 'create')->name('form.view');
        });

        // Riwayat Pengguna
        Route::group(['prefix' => 'user/riwayat', 'as' => 'riwayatPengguna.'], function () {
            Route::get('/', [RiwayatPrediksiController::class, 'index'])->name('index');
            Route::get('/detail/{riwayatPengguna}', [RiwayatPrediksiController::class, 'show'])->name('show');
            Route::delete('/destroy/{riwayatPengguna}', [RiwayatPrediksiController::class, 'destroy'])->name('destroy');
        });
    });
});



// routes/api.php
Route::prefix('models')->group(function () {
    Route::post('api/models/', [ModelStorageController::class, 'store'])->name('model.store');
    Route::get('api/models/{modelName}', [ModelStorageController::class, 'show'])->name('model.show');
});
Route::post('/riwayat/store', [RiwayatPenggunaController::class, 'store'])->name('riwayatPengguna.store')->middleware(['auth']);
