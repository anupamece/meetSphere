import API from "./axiosInstance";

export const createDining=async( diningData)=>{
    const response=await API.post('/dining/createDining',diningData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const getAllDining=async()=>{
    const response=await API.get('/dining/getAllDining');
    return response.data;
}

export const getDiningById=async(id)=>{
    const response=await API.get(`/dining/getDiningById/${id}`);
    return response.data;
}

export const updateDiningById=async(id, diningData)=>{
    const response=await API.put(`/dining/updateDining/${id}`, diningData);
    return response.data;
}

export const deleteDiningById=async(id)=>{
    const response=await API.delete(`/dining/deleteDining/${id}`);
    return response.data;
}