import React, { useState,useRef,useEffect } from 'react';
import { Link ,useNavigate,NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = ({ currentRole}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();


  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown state

  // const isAttendee = currentRole === 'attendee';

  const user = JSON.parse(localStorage.getItem('user'))||null;
  const userName = user?.name || '';
  const userEmail = user?.email || '';
  const navigate=useNavigate();

  const attendeeLinks = [
    { label: 'Explore Events', href: '/explore' },
    { label: 'Dining', href: '/dining' },
    { label: 'Movies', href: '/movies' },
    { label: 'Favorite Events', href: '/saved' },
    { label: 'My Tickets', href: '/my-tickets' },
  ];

  const organizerLinks = [
    { label: 'Overview', href: '/explore' },
    { label: 'Host Event', href: '/host-event' },
    { label: 'My Listings', href: '/manage' },
    { label: 'Scan Tickets', href: '/scanner' }
  ];

  const links = (currentRole==='attendee') ? attendeeLinks : organizerLinks;


  const profileOpenRef=useRef(null);
  useEffect(()=>{
    const handleClickOut=(e)=>{
      if(profileOpenRef.current &&
        !profileOpenRef.current.contains(e.target)){
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown',handleClickOut);

    return ()=>{
      document.removeEventListener('mousedown',handleClickOut);
    };
  },[]);
  return (
    <nav className="glassmorphism sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-2.5 cursor-pointer group">
            <img 
              src="/Logos/favicon.png" 
              alt="meetSphere Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
            />
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-primary-hover group-hover:to-primary-hover transition-all duration-300">
              meetSphere
            </span>
          </Link>

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
                            className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-primary to-secondary transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}
                        />
                    </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            
            {/* Custom Interactive Role Toggler Switch */}
            <div>
              <span>{currentRole === 'organizer' ? 'Organizer' : 'Attendee'}</span>
            </div>

            {/* User Profile Dropdown Placeholder */}
            <div className="relative" ref={profileOpenRef}>
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
                     'bg-primary'
                    }`}></div>
                    
                    {/* Main Image */}
                    <img 
                      src="/default-avatar.png"
                      alt="User profile" 
                      className="relative w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  </div>
                )}
              </button>

              {/* Profile Dropdown panel */}
              {isLoggedIn && profileOpen && (
                <div  className="absolute right-0 mt-3 w-52 rounded-2xl bg-white border border-brand-muted shadow-xl py-2 z-50 animate-fade-in font-premium text-sm text-slate-700">
                  <div className="px-4 py-2 border-b border-brand-muted">
                    <p className="font-bold text-slate-800">
                      {userName}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {userEmail}
                    </p>
                  </div>
                  <div className="py-1" onClick={()=>setProfileOpen(!profileOpen)}>
                    <a href="/profile" className="block px-4 py-2 hover:bg-brand-bg hover:text-primary transition-premium">
                      My Profile
                    </a>
                    <a href="#settings" className="block px-4 py-2 hover:bg-brand-bg hover:text-primary transition-premium">
                      Account Settings
                    </a>
                  </div>
                  <div className="border-t border-brand-muted py-1" onClick={()=>setProfileOpen(!profileOpen)}>
                    <button  onClick={() => {
                        const confirm=window.confirm("Are you sure you want to Logout ?");
                        if(confirm){
                          dispatch(logout());
                          setProfileOpen(false);
                          navigate('/auth')
                        }
                      }}  
                      className="block px-4 py-2 text-rose-500 hover:bg-rose-50 hover:font-bold transition-premium">
                      Log Out
                    </button>
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
