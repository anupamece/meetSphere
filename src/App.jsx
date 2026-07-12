import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Route ,Routes,useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './pages/homepage';
import HostEvent from './pages/hosteventpage';
import ExploreEvents from './pages/ExploreEvents';
const App = () => {
  const [role, setRole] = useState('attendee'); // State to manage the active user role
  const location = useLocation();

  const hideNavbar = location.pathname === '/auth'; // Hide Navbar on the auth page
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {/* Rendering the Navbar component with dynamic role and login states */}
      {!hideNavbar &&(
        <Navbar 
        currentRole={role} 
        onRoleChange={setRole} 
      />
      )}
      

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<ExploreEvents />} />
        <Route path='/host-event' element={<HostEvent />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </div>
  );
};

export default App;
