import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrganiserEvents, deleteEvent } from '../api/eventApi';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EventCard from '../components/events/EventCard.jsx';
import MovieCard from '../components/movies/MovieCard.jsx';
import DiningCard from '../components/Dining/DiningCard.jsx';
import { Calendar, Utensils, Film, Plus } from 'lucide-react';

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [diningEvents, setDiningEvents] = useState([]);
  const [movieEvents, setMovieEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrganiserEvents();
        if (!isActive) return;
        setEvents(Array.isArray(data.events) ? data.events : []);
        setDiningEvents(Array.isArray(data.diningEvents) ? data.diningEvents : []);
        setMovieEvents(Array.isArray(data.movieEvents) ? data.movieEvents : []);
      } catch (err) {
        if (!isActive) return;
        setError(err.response?.data?.message || 'Failed to fetch host listings.');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      isActive = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((ev) => ev._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete listing.');
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4BEE4]/60 pb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#4A1E6D]">
              Manage Your Listings
            </h1>
            <p className="font-premium text-sm text-[#4A1E6D]/70 mt-1">
              View, edit, or track attendance for events, movies, and dining spots you host.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/add-event"
              className="inline-flex items-center gap-1.5 gradient-brand text-white px-4 py-2.5 rounded-xl font-premium font-bold text-xs shadow-md hover:opacity-95 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Event
            </Link>
            <Link
              to="/add-movies"
              className="inline-flex items-center gap-1.5 bg-[#4A1E6D] text-white px-4 py-2.5 rounded-xl font-premium font-bold text-xs shadow-md hover:bg-[#4A1E6D]/90 transition-all"
            >
              <Film className="w-4 h-4" /> Add Movie
            </Link>
            <Link
              to="/add-dining"
              className="inline-flex items-center gap-1.5 bg-white border border-[#D4BEE4] text-[#4A1E6D] px-4 py-2.5 rounded-xl font-premium font-bold text-xs shadow-sm hover:bg-[#EEEEEE] transition-all"
            >
              <Utensils className="w-4 h-4 text-[#9B7EBD]" /> Add Dining
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <LoadingSpinner message="Fetching your listings..." />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm font-semibold text-rose-600">
            {error}
          </div>
        )}

        {/* Listings Display */}
        {!loading && !error && (
          <div className="space-y-10">
            
            {/* Live Events Section */}
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-[#4A1E6D] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#9B7EBD]" /> Live Events ({events.length})
              </h2>

              {events.length === 0 ? (
                <p className="font-premium text-xs text-[#4A1E6D]/60 italic">No events created yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {events.map((event) => (
                    <div key={event._id} className="relative group">
                      <EventCard event={event} />
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="mt-2 w-full py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-premium text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        Delete Listing
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Movies Section */}
            {movieEvents.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#D4BEE4]/40">
                <h2 className="font-display text-xl font-bold text-[#4A1E6D] flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#9B7EBD]" /> Movie Screenings ({movieEvents.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movieEvents.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}

            {/* Dining Spots Section */}
            {diningEvents.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#D4BEE4]/40">
                <h2 className="font-display text-xl font-bold text-[#4A1E6D] flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#9B7EBD]" /> Dining Spots ({diningEvents.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {diningEvents.map((spot) => (
                    <DiningCard key={spot._id} dining={spot} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default ManageEventsPage;
