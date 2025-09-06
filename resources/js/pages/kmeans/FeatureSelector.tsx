// components/FeatureSelector.tsx
import { FoodData } from '@/types';
import React from 'react';

interface FeatureSelectorProps {
    features: (keyof FoodData)[];
    selectedX: keyof FoodData;
    selectedY: keyof FoodData;
    onXChange: (feature: keyof FoodData) => void;
    onYChange: (feature: keyof FoodData) => void;
}

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({ features, selectedX, selectedY, onXChange, onYChange }) => {
    return (
        <div className="mb-4 flex gap-4 rounded-lg bg-gray-50 p-4">
            <div className="flex-1">
                <label htmlFor="x-feature" className="mb-1 block text-sm font-medium text-gray-700">
                    X-Axis Feature
                </label>
                <select
                    id="x-feature"
                    value={selectedX}
                    onChange={(e) => onXChange(e.target.value as keyof FoodData)}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                >
                    {features.map((feature) => (
                        <option key={feature} value={feature}>
                            {feature}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-1">
                <label htmlFor="y-feature" className="mb-1 block text-sm font-medium text-gray-700">
                    Y-Axis Feature
                </label>
                <select
                    id="y-feature"
                    value={selectedY}
                    onChange={(e) => onYChange(e.target.value as keyof FoodData)}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                >
                    {features.map((feature) => (
                        <option key={feature} value={feature}>
                            {feature}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
