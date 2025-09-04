// utils/modelStorage.ts
import axios from 'axios';

// Fungsi untuk menyimpan model ke database
export async function saveModelToDB(model: any, modelName: string): Promise<{ success: boolean; message?: string }> {
    try {
        // 3. Siapkan payload untuk API
        const payload = {
            model_name: modelName,
            model_json: model,
        };

        console.log(payload)
        // 4. Kirim ke backend Laravel
        const response = await axios.post(route('model.store'), payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { success: true, message: 'Model saved successfully' };
    } catch (error) {
        console.error('Error saving model:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}

// Fungsi untuk memuat model dari database
export async function loadModelFromDB(modelName: string): Promise<{ model: any }> {
    try {
        // 1. Fetch model data from Laravel backend
        const response = await axios.get(route('model.show', { modelName: modelName }));
        const { model_json } = response.data;

        // 5. Return both the model and normalization parameters
        return model_json;
    } catch (error) {
        console.error('Error loading model:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to load model');
    }
}
