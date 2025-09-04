<?php

namespace App\Http\Controllers;

use App\Models\ModelStorage;
use Illuminate\Http\Request;
use App\Http\Requests\StoreModelStorageRequest;
use App\Http\Requests\UpdateModelStorageRequest;
use App\Models\Indikator;

class ModelStorageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'model_name' => 'required|string',
            'model_json' => 'required|array',
        ]);

        $model = ModelStorage::updateOrCreate(
            ['model_name' => $validated['model_name']],
            ['model_json' => $validated['model_json']]
        );

        return response()->json([
            'message' => 'Model saved successfully',
            'model_id' => $model->id
        ], 201);
    }


    // Memuat model dari database
    public function show($modelName)
    {
        $model = ModelStorage::where('model_name', $modelName)
            ->latest()
            ->firstOrFail();
        return response()->json([
            'model_json' => $model->model_json,
        ]);
    }
}
