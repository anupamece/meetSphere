import { useState, useEffect } from 'react';
import EventCard from '../components/events/EventCard';
import { favEvents } from '../api/favApi';
import LoadingSpinner from '../components/common/LoadingSpinner';

function FavouritesPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setError('');
        const data = await favEvents();
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load favorite events.');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner message="Loading favorites..." /></div>;
  if (error) return <div className="text-center py-20 text-rose-500 font-premium">{error}</div>;
  if (events.length === 0) return <div className="text-center py-20 text-slate-500 font-premium">No favorite events saved yet.</div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Favorite Events</h1>
        <p className="font-premium text-sm text-[#4A1E6D]/70 mt-1">Events you have bookmarked for quick access.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} isFavorite={true} />
        ))}
      </div>
    </div>
  );
}

export default FavouritesPage;
