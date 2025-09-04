import { motion } from 'framer-motion';
import { BarChart2, ChevronRight, Leaf } from 'lucide-react';

interface ModelCardProps {
    title: string;
    prediction: string | number;
    mse: number;
    rsquared: string | number;
}

const ModelCard = ({ title, prediction, mse, rsquared }: ModelCardProps) => {
    return (
        <motion.div whileHover={{ y: -2 }} className="cursor-pointer rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-50 p-2 text-blue-500">
                        <Leaf size={20} />
                    </div>
                    <div>
                        <h3 className="font-medium">Euchuma {title}</h3>
                        <div className="mt-1 flex items-center gap-2">
                            <BarChart2 size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-500">Prediksi: {Number(prediction).toFixed(2)} Kg</span>
                        </div>
                        {/* <div className="flex items-center gap-2 mt-1">
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm text-gray-500">Update: {mse}</span>
            </div> */}
                    </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </div>
        </motion.div>
    );
};

export default ModelCard;
