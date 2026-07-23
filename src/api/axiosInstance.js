import axios from "axios";

const API=axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5008/api",
});
API.interceptors.response.use((res)=> res,
    (error)=>{
        if(error.response?.status==401){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href='/auth';
        }
        return Promise.reject(error);
    }
);
API.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");

    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;

},
(error)=>{
    return Promise.reject(error);
});

export default API;
