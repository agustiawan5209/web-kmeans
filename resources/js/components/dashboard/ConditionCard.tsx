interface ConditionCardProps {
    title: string;
    value: string;
    status: 'optimal' | 'warning' | 'critical';
    range: string;
}

const ConditionCard = ({ title, value, status, range }: ConditionCardProps) => {
    const statusColors = {
        optimal: 'bg-blue-100 text-blue-800 border-blue-200',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        critical: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
        <div className={`rounded-lg border p-3 md:p-4 ${statusColors[status]}`}>
            <h3 className="text-xs font-medium md:text-sm">{title}</h3>
            <p className="mt-1 text-lg font-bold md:text-2xl">{value}</p>
            <div className="mt-2 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
                <span className="truncate">Optimal: {range}</span>
                <span className="font-medium capitalize">{status}</span>
            </div>
        </div>
    );
};

export default ConditionCard;
