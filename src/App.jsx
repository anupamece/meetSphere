import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Route ,Routes,useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './pages/homepage';
import HostEvent from './pages/hosteventpage';
import { useSelector } from 'react-redux';
import ProfilePage from './pages/profilePage';

// const user=JSON.parse(localStorage.getItem('user'));
const App = () => {
  const user=useSelector((state)=>state.auth.user);
  const role=user?.role || 'attendee'

  
  
  const location = useLocation();

  const hideNavbar = location.pathname === '/auth'; // Hide Navbar on the auth page
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {/* Rendering the Navbar component with dynamic role and login states */}
      {!hideNavbar &&(
        <Navbar 
        currentRole={role}
      />
      )}
      

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/host-event' element={<HostEvent />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
};

export default App;
