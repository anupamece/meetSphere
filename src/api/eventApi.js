import { IdCardIcon } from 'lucide-react';
import API from './axiosInstance';


export const createEvent= async(eventData)=>{
    const response = await API.post('/events/createEvents',eventData);
    return response.data;
}

export const getEvents = async () => {
    const response = await API.get('/events/getEvents');
    return response.data;
}

export const isfav = async(id)=>{
    const response = await API.post(`/events/isfav/${id}`);
    return response.data;
}

export const eventDetails = async(id)=>{
    const response = await API.get(`/events/eventDetails/${id}`);
    return response.data;
}