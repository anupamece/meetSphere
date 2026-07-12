import API from './axiosInstance';


export const createEvent= async(eventData)=>{
    const response = await API.post('/events/createEvents',eventData);
    return response.data;
}

export const getEvents= async()=>{
    const response = await API.get('/events/getEvents');
    return response.data;
}
