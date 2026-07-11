import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading=true;
      state.error=null;
    } ,
    loginSuccess: (state, action) => {
      state.loading=false;
      state.user=action.payload.user;
      state.token=action.payload.token;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.loading=false;
      state.error=action.payload.error;
    },
    logout: (state) => {
      state.user=null;
      state.token=null;
      state.isLoggedIn=false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error=null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
