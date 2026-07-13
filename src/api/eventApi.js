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
<<<<<<< HEAD
export const getOrganiserEvents = async ()=>{
    const response=await API.get(`events/my-events`);
=======

export const isfav = async(id)=>{
    const response = await API.post(`/events/isfav/${id}`);
>>>>>>> f2db9c9 (front fav)
    return response.data;
}
