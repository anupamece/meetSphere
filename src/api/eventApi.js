import API from './axiosInstance';


export const createEvent= async(eventData)=>{
    const response = await API.post('/events/createEvents',eventData);
    return response.data;
}
