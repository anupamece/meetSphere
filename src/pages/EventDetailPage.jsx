import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  Clock,
  MapPin,
  Tag,
  Ticket,
  Users,
  Sparkles,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { eventDetails } from '../api/eventApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Footer from '../components/common/Footer';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await eventDetails(id);
        setEvent(data.event);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center">
        <LoadingSpinner message="Loading event details..." />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center p-4">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-8 text-center max-w-md">
          <h2 className="font-display text-xl font-bold text-[#4A1E6D] mb-2">Event Not Found</h2>
          <p className="font-premium text-xs text-[#4A1E6D]/70 mb-4">{error || "Unable to locate event details."}</p>
          <button
            onClick={() => navigate('/explore')}
            className="gradient-brand text-white px-5 py-2.5 rounded-xl font-premium text-xs font-bold shadow-md cursor-pointer"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    category,
    coverImage,
    venue,
    startDateTime,
    endDateTime,
    ticketPrice,
    totalTickets,
    ticketsSold,
    tags,
  } = event;

  const formattedStartDate = startDateTime
    ? new Date(startDateTime).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'TBA';

  const formattedStartTime = startDateTime
    ? new Date(startDateTime).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const formattedEndDate = endDateTime
    ? new Date(endDateTime).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  const formattedEndTime = endDateTime
    ? new Date(endDateTime).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const availableTickets = Math.max(0, (totalTickets || 0) - (ticketsSold || 0));
  const soldPercent = totalTickets > 0 ? Math.round((ticketsSold / totalTickets) * 100) : 0;

  const handleBookNow = () => {
    navigate(`/booking?type=Event&id=${event._id}`);
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      
      {/* ─── CINEMATIC HERO SECTION ─── */}
      <section className="relative min-h-[520px] overflow-hidden">
        <img
          src={coverImage || '/placeholder-event.jpg'}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-premium font-bold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="relative z-10 max-w-6xl mx-auto min-h-[520px] flex flex-col justify-end px-6 pb-12 pt-24 text-white">
          <div className="space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-sm font-premium font-semibold uppercase tracking-wider text-white border border-white/15">
              <Sparkles className="w-4 h-4 text-[#9B7EBD]" /> {category || 'Event'}
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {title}
            </h1>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-[#9B7EBD]" />
                {formattedStartDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#9B7EBD]" />
                {formattedStartTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#9B7EBD]" />
                {venue?.name ? `${venue.name}, ${venue.city || ''}` : venue?.city || 'Venue TBA'}
              </span>
            </div>

            {/* CTA Buttons in Hero */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleBookNow}
                disabled={availableTickets <= 0}
                className="flex items-center gap-2 rounded-xl gradient-brand px-7 py-3.5 font-premium font-bold text-white transition hover:opacity-95 cursor-pointer shadow-lg shadow-[#9B7EBD]/25 disabled:opacity-50"
              >
                <Ticket className="w-5 h-5" />
                Book Tickets
              </button>
              <span className="text-xs font-premium text-slate-300">
                {ticketPrice === 0 ? 'Free Entry' : `starting from ₹${ticketPrice}`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT SECTION ─── */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Description & Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About Event */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#4A1E6D] mb-4">About This Event</h2>
            <p className="font-premium text-sm leading-7 text-[#4A1E6D]/80 whitespace-pre-line">
              {description}
            </p>

            {/* Tags */}
            {Array.isArray(tags) && tags.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-[#9B7EBD]" />
                {tags.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[#4A1E6D]/10 text-[#4A1E6D] text-xs font-premium font-semibold border border-[#D4BEE4]/60">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <hr className="border-[#D4BEE4]/40" />

          {/* Event Details Grid */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#4A1E6D] mb-6">Event Details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-[#D4BEE4]/60 bg-white/70 backdrop-blur-md p-5 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-[#4A1E6D]/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-[#9B7EBD]" />
                </div>
                <div>
                  <p className="text-xs font-premium uppercase tracking-wider text-[#4A1E6D]/50 font-bold">Date</p>
                  <p className="font-premium font-bold text-sm text-[#4A1E6D] mt-0.5">{formattedStartDate}</p>
                  {formattedEndDate && (
                    <p className="text-xs font-premium text-[#4A1E6D]/60">to {formattedEndDate}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-[#D4BEE4]/60 bg-white/70 backdrop-blur-md p-5 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-[#4A1E6D]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#9B7EBD]" />
                </div>
                <div>
                  <p className="text-xs font-premium uppercase tracking-wider text-[#4A1E6D]/50 font-bold">Time</p>
                  <p className="font-premium font-bold text-sm text-[#4A1E6D] mt-0.5">{formattedStartTime || 'TBA'}</p>
                  {formattedEndTime && (
                    <p className="text-xs font-premium text-[#4A1E6D]/60">to {formattedEndTime}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-[#D4BEE4]/60 bg-white/70 backdrop-blur-md p-5 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-[#4A1E6D]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#9B7EBD]" />
                </div>
                <div>
                  <p className="text-xs font-premium uppercase tracking-wider text-[#4A1E6D]/50 font-bold">Venue</p>
                  <p className="font-premium font-bold text-sm text-[#4A1E6D] mt-0.5">{venue?.name || 'Venue TBA'}</p>
                  <p className="text-xs font-premium text-[#4A1E6D]/60">{venue?.address} {venue?.city}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-[#D4BEE4]/60 bg-white/70 backdrop-blur-md p-5 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-[#4A1E6D]/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#9B7EBD]" />
                </div>
                <div>
                  <p className="text-xs font-premium uppercase tracking-wider text-[#4A1E6D]/50 font-bold">Capacity</p>
                  <p className="font-premium font-bold text-sm text-[#4A1E6D] mt-0.5">{totalTickets || 0} Total Seats</p>
                  <p className="text-xs font-premium text-[#4A1E6D]/60">{ticketsSold || 0} booked</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Ticket Booking Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-slate-950 rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-5 text-white">
            
            {/* Price */}
            <div>
              <span className="text-[10px] font-premium font-bold text-slate-400 uppercase tracking-wider">Ticket Price</span>
              <div className="font-display text-3xl font-bold text-white mt-0.5">
                {ticketPrice === 0 ? (
                  <span className="text-emerald-400">FREE</span>
                ) : (
                  <span>₹{ticketPrice}</span>
                )}
              </div>
            </div>

            {/* Availability Bar */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <div className="flex justify-between text-xs font-premium">
                <span className="text-slate-400">Availability</span>
                <span className="font-bold text-white">{availableTickets} left</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full gradient-brand rounded-full transition-all duration-500"
                  style={{ width: `${soldPercent}%` }}
                />
              </div>
              <p className="text-[10px] font-premium text-slate-500">{soldPercent}% sold</p>
            </div>

            {/* Quick Info */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs font-premium text-slate-300">
                <CalendarDays className="w-3.5 h-3.5 text-[#9B7EBD] shrink-0" />
                <span className="truncate">{formattedStartDate}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-premium text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#9B7EBD] shrink-0" />
                <span className="truncate">{venue?.name || venue?.city || 'Venue TBA'}</span>
              </div>
            </div>

            {/* Book CTA */}
            <button
              onClick={handleBookNow}
              disabled={availableTickets <= 0}
              className="w-full gradient-brand text-white font-premium font-bold py-3.5 rounded-xl shadow-lg shadow-[#9B7EBD]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Ticket className="w-4 h-4" /> Book Tickets
            </button>

          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default EventDetailPage;
