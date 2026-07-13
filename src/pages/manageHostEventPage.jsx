import { useEffect, useState } from 'react';
import { getOrganiserEvents,deleteEvent } from '../api/eventApi';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
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
      } catch (err) {
        if (!isActive) return;
        setError(err.response?.data?.message || 'Failed to fetch events');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      isActive = false;
    };
  }, []);

  const handleDelete= async (id)=>{
    const confirm=window.confirm('Are you sure you want to delete this')
    if(!confirm) return;

    try{
        setLoading(true)
        setError(null)

        await deleteEvent(id);

        setEvents((prev)=>(
            prev.filter((event)=> event._id !== id)
        ));
    }
    catch(err){
        setError(err.response?.data?.message || "Failed to delete event")
    }
    finally{
        setLoading(false)
    }
    

    console.log('delete button clicked of event_id:',id)
  }
  const handleEdit=(id)=>{
    console.log('edit button clicked of event_id:', id)
  }

  return (
    <main className="relative overflow-hidden bg-brand-bg">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(155,126,189,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(74,30,109,0.12),transparent_28%)]" />

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {/* Page Header */}
        <div className="max-w-3xl">
          <p className="font-premium text-xs font-bold uppercase tracking-[0.35em] text-primary">
            Organizer Dashboard
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Manage Your Events
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-brand-dark/70 sm:text-base">
            View, edit, and track all the events you have created. Monitor attendee counts,
            update details, and manage your listings from here.
          </p>
        </div>

        <div className="mt-10">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <LoadingSpinner message="Fetching your events..." />
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm font-semibold text-rose-600 shadow-sm">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && events.length === 0 && (
            <div className="rounded-3xl border border-dashed border-brand-muted/80 bg-white/70 p-10 text-center shadow-sm backdrop-blur-sm">
              <p className="font-display text-2xl font-semibold text-brand-dark">
                No events created yet.
              </p>
              <p className="mt-2 text-sm text-brand-dark/65">
                Head over to the Host Event page to create your first event.
              </p>
              <a
                href="/host-event"
                className="mt-6 inline-block gradient-brand text-white font-premium font-semibold px-6 py-2.5 rounded-xl hover:opacity-95 transition-premium shadow-md shadow-primary/20 cursor-pointer"
              >
                Host an Event
              </a>
            </div>
          )}

          {/* Event Cards Grid */}
          {!loading && !error && events.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} 
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}/>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ManageEvents;
