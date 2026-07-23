import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrganiserEvents, deleteEvent } from '../api/eventApi';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';
import MovieCard from '../components/MovieCard';
import DiningCard from '../components/DiningCard';
import { Calendar, Utensils, Film, Plus } from 'lucide-react';

const ManageEvents = () => {
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

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this');
    if (!confirm) return;

    try {
      setLoading(true);
      setError(null);

      await deleteEvent(id);

      setEvents((prev) => (
        prev.filter((event) => event._id !== id)
      ));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }

    console.log('delete button clicked of event_id:', id);
  };
  const handleEdit = (id) => {
    console.log('edit button clicked of event_id:', id);
  };

  // Total listing count across all categories
  const totalListings = events.length + diningEvents.length + movieEvents.length;

  // Reusable section header
  const SectionHeader = ({ icon, title, count, accentColor }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2.5 rounded-xl ${accentColor}`}>
        {icon}
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-[#4A1E6D]">{title}</h2>
        <p className="font-premium text-xs text-[#4A1E6D]/50 mt-0.5">
          {count} {count === 1 ? 'listing' : 'listings'}
        </p>
      </div>
    </div>
  );

  // Reusable empty state for a section
  const SectionEmpty = ({ label, href }) => (
    <div className="rounded-2xl border border-dashed border-[#D4BEE4]/80 bg-white/50 p-8 text-center">
      <p className="font-premium text-sm text-[#4A1E6D]/60">
        You haven't created any {label} yet.
      </p>
      <Link
        to={href}
        className="mt-4 inline-flex items-center gap-1.5 font-premium text-xs font-bold text-[#4A1E6D] hover:text-[#9B7EBD] transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Create {label}
      </Link>
    </div>
  );

  return (
    <main className="relative overflow-hidden bg-[#EEEEEE]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(155,126,189,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(74,30,109,0.12),transparent_28%)]" />

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {/* Page Header */}
        <div className="max-w-3xl">
          <p className="font-premium text-xs font-bold uppercase tracking-[0.35em] text-[#9B7EBD]">
            Organizer Dashboard
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#4A1E6D] sm:text-5xl">
            My Listings
          </h1>
          <p className="mt-4 max-w-2xl font-premium text-sm leading-6 text-[#4A1E6D]/70 sm:text-base">
            View and track all the events, dining venues, and movie screenings you have created on meetSphere.
          </p>
        </div>

        <div className="mt-12">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <LoadingSpinner message="Fetching your listings..." />
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm font-semibold text-rose-600 shadow-sm">
              {error}
            </div>
          )}

          {/* Global Empty State (nothing at all) */}
          {!loading && !error && totalListings === 0 && (
            <div className="rounded-3xl border border-dashed border-[#D4BEE4]/80 bg-white/70 p-10 text-center shadow-sm backdrop-blur-sm">
              <p className="font-display text-2xl font-semibold text-[#4A1E6D]">
                No listings created yet.
              </p>
              <p className="mt-2 font-premium text-sm text-[#4A1E6D]/65">
                Head over to the Host Event page to create your first listing.
              </p>
              <Link
                to="/host-event"
                className="mt-6 inline-block gradient-brand text-white font-premium font-semibold px-6 py-2.5 rounded-xl hover:opacity-95 transition-premium shadow-md shadow-[#9B7EBD]/20 cursor-pointer"
              >
                Host an Event
              </Link>
            </div>
          )}

          {/* ═══════════════════════════════════════════════ */}
          {/* Listing Sections (only render when data exists) */}
          {/* ═══════════════════════════════════════════════ */}
          {!loading && !error && totalListings > 0 && (
            <div className="space-y-14">

              {/* ─── Section 1: General Events ─── */}
              <div>
                <SectionHeader
                  icon={<Calendar className="w-5 h-5 text-[#4A1E6D]" />}
                  title="Live & General Events"
                  count={events.length}
                  accentColor="bg-[#4A1E6D]/10"
                />
                {events.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {events.map((event) => (
                      <EventCard key={event._id} event={event}
                        showActions={true}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <SectionEmpty label="events" href="/add-event" />
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-[#D4BEE4]/40" />

              {/* ─── Section 2: Dining Venues ─── */}
              <div>
                <SectionHeader
                  icon={<Utensils className="w-5 h-5 text-[#4A1E6D]" />}
                  title="Dining & Culinary Venues"
                  count={diningEvents.length}
                  accentColor="bg-[#D4BEE4]/40"
                />
                {diningEvents.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {diningEvents.map((event) => (
                      <DiningCard key={event._id} dining={event} />
                    ))}
                  </div>
                ) : (
                  <SectionEmpty label="dining venues" href="/add-dining" />
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-[#D4BEE4]/40" />

              {/* ─── Section 3: Movie Screenings ─── */}
              <div>
                <SectionHeader
                  icon={<Film className="w-5 h-5 text-[#4A1E6D]" />}
                  title="Movie Screenings"
                  count={movieEvents.length}
                  accentColor="bg-[#9B7EBD]/15"
                />
                {movieEvents.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {movieEvents.map((movie) => (
                      <MovieCard key={movie._id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <SectionEmpty label="movie screenings" href="/add-movies" />
                )}
              </div>

            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ManageEvents;
