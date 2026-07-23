import {useState,useEffect} from 'react'


const StatusBadge = ({date}) => {
    const [status,setStatus] = useState('');
    useEffect(()=>{
        const currentDate = new Date();
        const targetDate = new Date(date);
        if(currentDate < targetDate){
            setStatus('Upcoming');
        }else{
            setStatus('Completed');
        }
    },[date])
    return(
        <span className={`px-2 py-1 rounded-full text-white ${status === 'Upcoming' ? 'bg-green-500' : 'bg-gray-500'}`}>
            {status}
        </span>
    )
}
export default StatusBadge;