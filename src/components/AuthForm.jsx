import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {loginStart,loginSuccess,loginFailure} from '../redux/authSlice';
import {loginUser,registerUser} from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ defaultMode = 'login', onSubmit }) => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const {loading,error}=useSelector((state)=>state.auth)
  const [mode, setMode] = useState(defaultMode); // 'login' or 'signup'
  const [role, setRole] = useState('attendee'); // 'attendee' or 'organizer'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const isLogin = mode === 'login';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try{
      let data;
      if(isLogin){
        data=await loginUser({
          email:formData.email,
          password:formData.password,
          role:role,

        });
      }
      else{
        data=await registerUser({
          name:formdData.name,
          email:formData.email,
          password:formData.password,
          role:role,
        });
      }

      localStorage.setItem('token',data.token);
      localStorage.setItem('user',JSON.stringify(data.user));

      dispatch(loginSuccess({user:data.user,token:data.token}));

      navigate('/');
    }
    catch(error){
      const message=error.response?.data?.message || 'Something went wrong';
      dispatch(loginFailure({error:message}));
    }
    console.log('Form submitted:', { ...formData, role });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl border border-brand-muted shadow-xl p-8 hover-premium transition-premium">
        
        {/* Form Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-brand-bg rounded-2xl border border-brand-muted mb-4 shadow-sm">
            <img src="/Logos/favicon.png" alt="meetSphere Logo" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="font-premium text-sm text-slate-500 mt-1.5 leading-relaxed">
            {isLogin ? 'Sign in to access your meetSphere events' : 'Join meetSphere to host or join amazing gatherings'}
          </p>
        </div>

        {/* Form Element */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl
            text-rose-600 text-xs font-premium font-semibold text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="space-y-5">
          
          {/* Full Name Field (Sign Up Only) */}
          {!isLogin && (
            <div className="space-y-1.5 animate-slide-down">
              <label htmlFor="name" className="block text-xs font-bold font-premium text-slate-400 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-50 border border-brand-muted rounded-xl font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary focus:bg-white transition-all duration-200"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold font-premium text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-slate-50 border border-brand-muted rounded-xl font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-bold font-premium text-slate-400 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-brand-muted rounded-xl font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Role selector (Sign Up Only) */}
          {!isLogin && (
            <div className="space-y-2 animate-slide-down">
              <label className="block text-xs font-bold font-premium text-slate-400 uppercase tracking-wider">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('attendee')}
                  className={`py-3 rounded-xl font-premium text-xs font-bold border transition-premium cursor-pointer ${
                    role === 'attendee'
                      ? 'border-secondary bg-sky-50/40 text-secondary'
                      : 'border-brand-muted bg-white text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Discover & Book
                </button>
                <button
                  type="button"
                  onClick={() => setRole('organizer')}
                  className={`py-3 rounded-xl font-premium text-xs font-bold border transition-premium cursor-pointer ${
                    role === 'organizer'
                      ? 'border-primary bg-violet-50/40 text-primary'
                      : 'border-brand-muted bg-white text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Host Events
                </button>
              </div>
            </div>
          )}

          {/* Remember & Forgot Password (Login Only) */}
          {isLogin && (
            <div className="flex items-center justify-between text-xs font-premium py-1">
              <label className="flex items-center space-x-2 text-slate-500 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer focus:ring-offset-0 transition-premium" 
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="font-bold text-primary hover:text-primary-hover transition-premium">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 gradient-brand text-white font-premium font-semibold
              py-3 px-6 rounded-xl hover:opacity-95 transition-premium shadow-md
              shadow-purple-500/15 cursor-pointer
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading
              ? 'Please wait...'
              : isLogin ? 'Sign In' : 'Get Started'
            }
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="text-center mt-6 pt-6 border-t border-brand-muted font-premium text-sm text-slate-500">
          {isLogin ? (
            <p>
              New to meetSphere?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-secondary hover:text-cyan-600 transition-premium ml-1 cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-primary hover:text-primary-hover transition-premium ml-1 cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthForm;
