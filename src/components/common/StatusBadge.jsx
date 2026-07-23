import { useState, useEffect } from 'react';

const StatusBadge = ({ date }) => {
    const [status, setStatus] = useState('');
    useEffect(() => {
        const currentDate = new Date();
        const targetDate = new Date(date);
        if (currentDate < targetDate) {
            setStatus('Upcoming');
        } else {
            setStatus('Completed');
        }
    }, [date]);

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${status === 'Upcoming' ? 'bg-emerald-500' : 'bg-slate-500'}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
