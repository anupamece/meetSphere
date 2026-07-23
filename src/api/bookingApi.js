import API from "./axiosInstance";

export const initiateBooking = async (bookingData)=>{
    const response=await API.post("/booking/initiate",bookingData);
    return response.data;
}
export const simulatePayment = async (paymentData)=>{
    const response=await API.post("/booking/simulate-payment",paymentData);
    return response.data;
}
export const confirmBooking = async (bookingId)=>{
    const response=await API.post("/booking/confirm",{bookingId});
    return response.data;
}



//user APIs
export const getMyBookings = async ()=>{
    const response=await API.get("/booking/my-bookings");
    return response.data;
}
export const getBookingById = async (bookingId)=>{
    const response=await API.get(`/booking/${bookingId}`);
    return response.data;
}
export const cancelBooking = async (bookingId)=>{
    const response=await API.post(`/booking/${bookingId}/cancel`);
    return response.data;
}

//organizer APis
export const getEventAttendees = async (itemId,type)=>{
    const response=await API.get(`/booking/event/${itemId}/attendees?type=${type}`);
    return response.data;
}
export const getOrganizerStats = async ()=>{
    const response=await API.get("/booking/stats");
    return response.data;
}