import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import {
  User, Mail, Shield, Ticket, CalendarDays, Settings,
  Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Star
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

  const profileActions = [
    {
      label: 'My Tickets',
      desc: 'View and manage your booked tickets',
      icon: <Ticket className="w-5 h-5" />,
      href: '/tickets',
      color: 'text-[#9B7EBD]',
      bg: 'bg-[#D4BEE4]/25',
    },
    {
      label: 'My Events',
      desc: 'Events you have created or saved',
      icon: <CalendarDays className="w-5 h-5" />,
      href: '/manage',
      color: 'text-[#4A1E6D]',
      bg: 'bg-[#4A1E6D]/10',
    },
    {
      label: 'Reviews & Ratings',
      desc: 'Your event reviews and feedback',
      icon: <Star className="w-5 h-5" />,
      href: '#reviews',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Payment Methods',
      desc: 'Manage cards and payment options',
      icon: <CreditCard className="w-5 h-5" />,
      href: '#payments',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Notifications',
      desc: 'Event reminders and platform alerts',
      icon: <Bell className="w-5 h-5" />,
      href: '#notifications',
      color: 'text-[#9B7EBD]',
      bg: 'bg-[#D4BEE4]/25',
    },
    {
      label: 'Account Settings',
      desc: 'Update password, preferences, and privacy',
      icon: <Settings className="w-5 h-5" />,
      href: '#settings',
      color: 'text-slate-600',
      bg: 'bg-slate-100',
    },
    {
      label: 'Help & Support',
      desc: 'FAQs, contact support, and documentation',
      icon: <HelpCircle className="w-5 h-5" />,
      href: '#help',
      color: 'text-sky-600',
      bg: 'bg-sky-50',
    },
  ];

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to log out?');
    if (confirm) {
      dispatch(logout());
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* ─── Profile Header Card ─── */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-brand-muted/60 shadow-sm overflow-hidden">
          
          {/* Gradient Banner */}
          <div className="h-28 sm:h-32 gradient-brand relative">
            {/* Decorative circles */}
            <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-white/10 blur-lg"></div>
            <div className="absolute bottom-2 right-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
          </div>

          {/* Avatar & Info */}
          <div className="relative px-6 sm:px-8 pb-6">
            {/* Centered Avatar (pulled up over banner) */}
            <div className="flex justify-center -mt-14 sm:-mt-16">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-1 rounded-full bg-linear-to-br from-primary to-[#4A1E6D] opacity-60 blur-sm"></div>
                <img
                  src="/default-avatar.png"
                  alt="Profile"
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {/* Online indicator */}
                <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 border-[3px] border-white rounded-full"></span>
              </div>
            </div>

            {/* User Details */}
            <div className="text-center mt-4 space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#4A1E6D]">
                {user.name}
              </h1>
              <div className="flex items-center justify-center gap-2 text-[#4A1E6D]/60">
                <Mail className="w-3.5 h-3.5" />
                <span className="font-premium text-sm">{user.email}</span>
              </div>
              <div className="pt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-premium uppercase tracking-wider ${
                  user.role === 'organizer'
                    ? 'bg-[#4A1E6D]/10 text-[#4A1E6D] border border-[#4A1E6D]/20'
                    : 'bg-brand-muted/40 text-primary border border-brand-muted'
                }`}>
                  <Shield className="w-3 h-3" />
                  {user.role}
                </span>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-brand-muted/40">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-[#4A1E6D]">0</p>
                <p className="font-premium text-xs text-[#4A1E6D]/55 mt-0.5">Events</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-[#4A1E6D]">0</p>
                <p className="font-premium text-xs text-[#4A1E6D]/55 mt-0.5">Tickets</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-[#4A1E6D]">0</p>
                <p className="font-premium text-xs text-[#4A1E6D]/55 mt-0.5">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Profile Action Items ─── */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-brand-muted/60 shadow-sm overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-brand-muted/40">
            <h2 className="font-premium font-bold text-sm uppercase tracking-wider text-primary">
              Account
            </h2>
          </div>

          <div className="divide-y divide-brand-muted/30">
            {profileActions.map((action, idx) => (
              <a
                key={idx}
                href={action.href}
                className="flex items-center gap-4 px-6 sm:px-8 py-4 hover:bg-brand-muted/10 transition-all duration-200 group cursor-pointer"
              >
                {/* Icon Container */}
                <div className={`p-2.5 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                  {action.icon}
                </div>

                {/* Label & Description */}
                <div className="flex-1 min-w-0">
                  <p className="font-premium font-semibold text-sm text-[#4A1E6D] group-hover:text-primary transition-colors duration-200">
                    {action.label}
                  </p>
                  <p className="font-premium text-xs text-[#4A1E6D]/55 truncate">
                    {action.desc}
                  </p>
                </div>

                {/* Chevron Arrow */}
                <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </a>
            ))}
          </div>
        </div>

        {/* ─── Logout Section ─── */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-rose-200/60 shadow-sm overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 sm:px-8 py-4 hover:bg-rose-50/50 transition-all duration-200 group cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform duration-200">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-premium font-semibold text-sm text-rose-600">Log Out</p>
              <p className="font-premium text-xs text-rose-400">Sign out of your meetSphere account</p>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all duration-200" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;