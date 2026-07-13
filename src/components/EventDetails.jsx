import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './EventCard';
import { eventDetails } from '../api/eventApi';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setError('');
        const data = await eventDetails(id);
        setEvent(data.event);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load event details.');
      }
    };

    loadEvent();
  }, [id]);

  if (error) return <p className="p-6 text-rose-600">{error}</p>;
  if (!event) return <p>Loading...</p>;

  return <EventCard event={event} />;
}

export default EventDetails;
