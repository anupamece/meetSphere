import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import {
  User, Mail, Ticket, LogOut, ChevronRight, Star
} from 'lucide-react';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-brand-muted/60 p-10 text-center space-y-4 max-w-sm">
          <div className="p-4 bg-brand-muted/30 rounded-2xl inline-flex">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#4A1E6D]">Not Logged In</h2>
          <p className="font-premium text-sm text-[#4A1E6D]/70">Please sign in to view your profile.</p>
          <button
            onClick={() => navigate('/auth')}
            className="gradient-brand text-white font-premium font-semibold px-6 py-2.5 rounded-xl hover:opacity-95 transition-premium shadow-md shadow-primary/20 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const isOrganizer = user.role === 'organizer';

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src="/default-avatar.png"
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <span className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#4A1E6D]">
                {user.name}
              </h1>
              <span className={`self-center sm:self-auto px-3 py-0.5 rounded-full text-xs font-premium font-bold uppercase tracking-wider ${
                isOrganizer ? 'bg-[#9B7EBD]/20 text-[#4A1E6D]' : 'bg-[#4A1E6D]/10 text-[#4A1E6D]'
              }`}>
                {user.role}
              </span>
            </div>
            <p className="font-premium text-sm text-[#4A1E6D]/70 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-4 h-4 text-[#9B7EBD]" /> {user.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-premium font-semibold text-xs hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/my-tickets')}
            className="bg-white/70 backdrop-blur-md rounded-2xl border border-[#D4BEE4]/60 p-5 flex items-center justify-between text-left hover:bg-white transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#4A1E6D]/10 rounded-xl text-[#4A1E6D]">
                <Ticket className="w-5 h-5 text-[#9B7EBD]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[#4A1E6D]">My Tickets</h4>
                <p className="font-premium text-xs text-[#4A1E6D]/60">View booked passes</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#4A1E6D]/40 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/saved')}
            className="bg-white/70 backdrop-blur-md rounded-2xl border border-[#D4BEE4]/60 p-5 flex items-center justify-between text-left hover:bg-white transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#4A1E6D]/10 rounded-xl text-[#4A1E6D]">
                <Star className="w-5 h-5 text-[#9B7EBD]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[#4A1E6D]">Saved Favorites</h4>
                <p className="font-premium text-xs text-[#4A1E6D]/60">Bookmarked events</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#4A1E6D]/40 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
