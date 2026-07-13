import API from './axiosInstance';

export const favEvents= async()=>{
    const response = await API.get('/fav/favEvents');
    return response.data;
}