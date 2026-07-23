import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/common/Navbar';

// Page Components
import HomePage from './pages/HomePage';
import ExploreEventsPage from './pages/ExploreEventsPage';
import EventDetailPage from './pages/EventDetailPage';
import HostEventPage from './pages/HostEventPage';
import AddEventPage from './pages/AddEventPage';
import ManageEventsPage from './pages/ManageEventsPage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import AddMoviePage from './pages/AddMoviePage';
import DiningPage from './pages/DiningPage';
import AddDiningPage from './pages/AddDiningPage';
import FavouritesPage from './pages/FavouritesPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import MyTicketsPage from './pages/MyTicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';

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
