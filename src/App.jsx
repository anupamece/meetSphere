import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/common/Navbar.jsx';

// Page Components
import HomePage from './pages/HomePage.jsx';
import ExploreEventsPage from './pages/ExploreEventsPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import HostEventPage from './pages/HostEventPage.jsx';
import AddEventPage from './pages/AddEventPage.jsx';
import ManageEventsPage from './pages/ManageEventsPage.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import AddMoviePage from './pages/AddMoviePage.jsx';
import DiningPage from './pages/DiningPage.jsx';
import AddDiningPage from './pages/AddDiningPage.jsx';
import FavouritesPage from './pages/FavouritesPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import MyTicketsPage from './pages/MyTicketsPage.jsx';
import TicketDetailsPage from './pages/TicketDetailsPage.jsx';

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || 'attendee';

  const location = useLocation();
  const hideNavbar = location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {!hideNavbar && <Navbar currentRole={role} />}

      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExploreEventsPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/host-event" element={<HostEventPage />} />
        <Route path="/add-event" element={<AddEventPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/saved" element={<FavouritesPage />} />
        <Route path="/manage" element={<ManageEventsPage />} />
        <Route path="/dining" element={<DiningPage />} />
        <Route path="/add-dining" element={<AddDiningPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/add-movies" element={<AddMoviePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/my-tickets" element={<MyTicketsPage />} />
        <Route path="/booking/:id" element={<TicketDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
