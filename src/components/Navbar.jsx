import React, { useState } from 'react';
import { Link ,NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = ({ currentRole = 'attendee', onRoleChange }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();


  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown state

  const isAttendee = currentRole === 'attendee';

  const attendeeLinks = [
    { label: 'Explore Events', href: '/explore' },
    { label: 'Saved Events', href: '/saved' },
    { label: 'My Tickets', href: '/tickets' }
  ];

  const organizerLinks = [
    { label: 'Overview', href: '/overview' },
    { label: 'Create Event', href: '/create-event' },
    { label: 'Manage Events', href: '/manage' },
    { label: 'Scan Tickets', href: '/scanner' }
  ];

  const links = isAttendee ? attendeeLinks : organizerLinks;

  return (
    <nav className="glassmorphism sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
              <Link to="/" className="relative flex items-center space-x-2 px-3 py-2 rounded-xl bg-white border border-brand-muted shadow-sm hover:shadow-md transition-premium">
                <img 
                    src="/Logos/favicon.png" 
                    alt="meetSphere Logo" 
                    className="relative w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-lg bg-white p-1"
                />
              </Link>
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              meetSphere
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className= {({ isActive }) => `font-premium text-sm font-semibold text-slate-600 hover:text-primary transition-premium relative py-2 group ${isActive ? 'text-primary' : ''}`}
              >
                {({isActive})=>(
                    <>
                        {link.label}
                        <span
                            className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}
                        />
                    </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side: Role Toggle, Profile & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            
            {/* Custom Interactive Role Toggler Switch */}
            <div className="relative bg-slate-100 p-1 rounded-full flex items-center w-36 sm:w-40 border border-slate-200 shadow-inner">
              <div 
                className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out shadow-sm w-[70px] sm:w-[76px] ${
                  isAttendee 
                    ? 'left-1 bg-secondary' 
                    : 'left-[calc(100%-74px)] sm:left-[calc(100%-80px)] bg-primary'
                }`}
              ></div>
              <button 
                onClick={() => onRoleChange('attendee')}
                className={`z-10 w-1/2 text-[10px] sm:text-xs font-bold font-premium text-center cursor-pointer transition-all duration-200 ${
                  isAttendee ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Attendee
              </button>
              <button 
                onClick={() => onRoleChange('organizer')}
                className={`z-10 w-1/2 text-[10px] sm:text-xs font-bold font-premium text-center cursor-pointer transition-all duration-200 ${
                  !isAttendee ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Organizer
              </button>
            </div>

            {/* User Profile Dropdown Placeholder */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="relative flex items-center justify-center focus:outline-none cursor-pointer group rounded-full"
              >
                {!isLoggedIn ? (
                  /* Styled Guest Icon */
                  <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-premium">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                ) : (
                  /* Crisp Profile Avatar with Glowing Active Border */
                  <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
                    {/* Ring glow background (Primary for Organizer, Secondary for Attendee) */}
                    <div className={`absolute -inset-0.5 rounded-full blur-[3px] opacity-75 group-hover:opacity-100 transition-premium ${
                      isAttendee ? 'bg-secondary' : 'bg-primary'
                    }`}></div>
                    
                    {/* Main Image */}
                    <img 
                      src={isAttendee 
                        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      } 
                      alt="User profile" 
                      className="relative w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    
                    {/* Live Online Badge */}
                    <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-emerald-500 animate-pulse-soft"></span>
                  </div>
                )}
              </button>

              {/* Profile Dropdown panel */}
              {isLoggedIn && profileOpen && (
                <div  className="absolute right-0 mt-3 w-52 rounded-2xl bg-white border border-brand-muted shadow-xl py-2 z-50 animate-fade-in font-premium text-sm text-slate-700">
                  <div className="px-4 py-2 border-b border-brand-muted">
                    <p className="font-bold text-slate-800">
                      {isAttendee ? 'Sarah Jenkins' : 'Alex Mercer'}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {isAttendee ? 'sarah.j@example.com' : 'alex.m@events.com'}
                    </p>
                  </div>
                  <div className="py-1" onClick={()=>setProfileOpen(!profileOpen)}>
                    <a href="#profile" className="block px-4 py-2 hover:bg-brand-bg hover:text-primary transition-premium">
                      My Profile
                    </a>
                    <a href="#settings" className="block px-4 py-2 hover:bg-brand-bg hover:text-primary transition-premium">
                      Account Settings
                    </a>
                  </div>
                  <div className="border-t border-brand-muted py-1" onClick={()=>setProfileOpen(!profileOpen)}>
                    <a  onClick={() => dispatch(logout())} href="#logout" className="block px-4 py-2 text-rose-500 hover:bg-rose-50 hover:font-bold transition-premium">
                      Log Out
                    </a>
                  </div>
                </div>
              )}

              {!isLoggedIn && profileOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-white border border-brand-muted shadow-xl py-2 z-50 animate-fade-in font-premium text-sm text-slate-700">
                  <div className="px-4 py-2 border-b border-brand-muted">
                    <p className="font-bold text-slate-800">Guest User</p>
                    <p className="text-xs text-slate-400 truncate">Please log in</p>
                  </div>
                  <div className="py-1" onClick={()=>setProfileOpen(!profileOpen)}>
                    <Link to="/auth" className="block px-4 py-2 hover:bg-brand-bg hover:text-primary transition-premium">
                      Log In
                    </Link>
                    <Link to="/auth" className="block px-4 py-2 hover:bg-brand-bg hover:text-primary transition-premium">
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>
        

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-primary focus:outline-none p-1.5 cursor-pointer rounded-lg border border-slate-200 hover:bg-slate-50 transition-premium"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  /* Close Icon */
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  /* Hamburger Icon */
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-brand-muted bg-white/95 backdrop-blur-md animate-slide-down">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-600 hover:text-primary hover:bg-brand-bg transition-premium font-premium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
