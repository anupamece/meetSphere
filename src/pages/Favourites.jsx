import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { favEvents } from '../api/favApi';


function Favourites() {
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

  if (loading) return <div>Loading favorite events...</div>;
  if (error) return <div>{error}</div>;
  if (events.length === 0) return <div>No favorite events yet.</div>;

  return (
    <div>
    {
      events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))
    }
    </div>
  )
}

export default Favourites
