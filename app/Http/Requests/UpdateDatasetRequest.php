<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDatasetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'label' => ['required', 'string'],
            'parameter' => ['required'],
            'keterangan' => ['nullable', 'string'],
            'parameter.*.indikator_id' => ['required', 'exists:indikators,id']
        ];
    }

    public function messages(): array
    {
        return [
            'label.required' => 'Nama Makanan wajib diisi',
            'label.string' => 'Nama Makanan harus berupa string',
            'parameter.required' => 'Parameter wajib diisi',
            'keterangan.string' => 'Keterangan harus berupa string',
            'parameter.*.indikator_id.required' => 'Indikator wajib diisi',
            'parameter.*.indikator_id.exists' => 'Indikator tidak ditemukan',
        ];
    }
}
