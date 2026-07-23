import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/authSlice';
import { loginUser, registerUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ defaultMode = 'login' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    dispatch(loginStart());

    try {
      if (isLogin) {
        const data = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        dispatch(loginSuccess(data));
        navigate('/');
      } else {
        const data = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role
        });

        dispatch(loginSuccess(data));
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      dispatch(loginFailure({ error: errorMessage }));
    }
  };

  const toggleMode = () => {
    setMode(isLogin ? 'signup' : 'login');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-brand-muted/60 shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-[#4A1E6D]">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 font-premium text-sm text-slate-500">
            {isLogin ? 'Sign in to access your tickets and events' : 'Join meetSphere to discover & host events'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 font-premium text-xs text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Role selector for Signup */}
          {!isLogin && (
            <div className="flex gap-4 p-1 bg-brand-bg/50 rounded-xl border border-brand-muted/40">
              <button
                type="button"
                onClick={() => setRole('attendee')}
                className={`flex-1 py-2 rounded-lg font-premium text-xs font-bold transition-all ${
                  role === 'attendee' ? 'bg-[#4A1E6D] text-white shadow-sm' : 'text-slate-600 hover:text-[#4A1E6D]'
                }`}
              >
                Attendee
              </button>
              <button
                type="button"
                onClick={() => setRole('organizer')}
                className={`flex-1 py-2 rounded-lg font-premium text-xs font-bold transition-all ${
                  role === 'organizer' ? 'bg-[#4A1E6D] text-white shadow-sm' : 'text-slate-600 hover:text-[#4A1E6D]'
                }`}
              >
                Organizer
              </button>
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold font-premium text-slate-600 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-brand-bg/40 border border-brand-muted/60 rounded-xl font-premium text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold font-premium text-slate-600 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-brand-bg/40 border border-brand-muted/60 rounded-xl font-premium text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold font-premium text-slate-600 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-brand-bg/40 border border-brand-muted/60 rounded-xl font-premium text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-bold font-premium text-slate-600 uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-brand-bg/40 border border-brand-muted/60 rounded-xl font-premium text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 gradient-brand text-white font-premium font-bold rounded-xl shadow-md hover:opacity-95 transition-premium disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-brand-muted/40">
          <p className="font-premium text-xs text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="font-bold text-[#4A1E6D] hover:text-[#9B7EBD] transition-colors cursor-pointer"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;
