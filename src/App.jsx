import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import { Route ,Routes,useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './pages/homepage';
import HostEvent from './pages/hosteventpage';
import HostEventForm from './components/hostEventForms/hostEventForm';
import ExploreEvents from './pages/ExploreEvents';
import EventDetails from './components/EventDetails';
import Favourites from './pages/Favourites';
import ManageEvents from './pages/manageHostEventPage';
import Dining from './pages/Dining';
import AddMovies from './components/addMovies/AddMovies';
import Movie from './pages/Movie';
import MovieDetails from './components/MovieDetails';
import AddDiningPage from './pages/addDiningPage';
import BookingPage from './pages/bookingPage';
import MyTicketsPage from './pages/myTickets';
import TicketDetails from './pages/ticketdetails';
const App = () => {
  const user=useSelector((state)=>state.auth.user);
  const role=user?.role || 'attendee'
  
  
  const location = useLocation();

  const hideNavbar = location.pathname === '/auth'; 
  return (
    
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      
     
      {!hideNavbar &&(
        <Navbar 
        currentRole={role}
      />
      )}
      

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<ExploreEvents />} />
        <Route path='/host-event' element={<HostEvent />} />
        <Route path='/add-event' element={<HostEventForm />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/saved" element={<Favourites />} />
        <Route path='/manage' element={<ManageEvents/>}/>
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/dining" element={<Dining />} />
        <Route path='/add-dining' element={<AddDiningPage />} />
        <Route path="/add-movies" element={<AddMovies />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/my-tickets" element={<MyTicketsPage />} />
        <Route path="/booking/:id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;
