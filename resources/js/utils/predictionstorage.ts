// utils/predictionStorage.ts
import axios from 'axios';
// Fungsi untuk menyimpan model ke database
export async function savePredictionToDB(
    prediction: string | number,
    modelName: string,
    mse: null | number,
    rsquared: null | number,
): Promise<{ success: boolean; message?: string }> {
    try {

        // 1. Simpan model sementara ke IndexedDB
        await axios.post(route('prediction.store'), {
            model_name: modelName,
            prediction: prediction,
            mse: mse,
            rsquared: rsquared,
        });
        return { success: true, message: 'Model saved successfully' };
    } catch (error) {
        console.error('Error saving prediction:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}


