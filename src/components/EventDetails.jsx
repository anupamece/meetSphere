import React, { useEffect, useState, } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import {
  CalendarDays,
  Clock,
  MapPin,
  Tag,
  Ticket,
  Users,
  CheckCircle2,
  Sparkles,
  Share2
} from 'lucide-react';
import { eventDetails } from '../api/eventApi';
import LoadingSpinner from './LoadingSpinner';
import Footer from './home/Footer';
import { categoryDescriptions } from '../data/categoryDescriptions';

const EventDetails = () => {
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
    return <LoadingSpinner message="Fetching event details..." />;
  }

  if (error || !event) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 px-4">
        <h2 className="font-display text-2xl font-bold text-[#4A1E6D]">
          {error || 'Event Not Found'}
        </h2>
        <p className="font-premium text-sm text-[#4A1E6D]/70">
          The event listing you are looking for might have been moved or removed.
        </p>
      </div>
    );
  }

  // Format dates
  const startDateFormatted = event.startDateTime
    ? new Date(event.startDateTime).toLocaleString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'TBD';

  const endDateFormatted = event.endDateTime
    ? new Date(event.endDateTime).toLocaleString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'TBD';

  // Event status label
  const now = Date.now();
  const startTime = event.startDateTime ? new Date(event.startDateTime).getTime() : 0;
  const endTime = event.endDateTime ? new Date(event.endDateTime).getTime() : 0;

  const statusLabel =
    now < startTime ? 'Upcoming' : now > endTime ? 'Completed' : 'Live Now';

  const statusBadgeBg =
    statusLabel === 'Live Now'
      ? 'bg-emerald-500/80 text-white'
      : statusLabel === 'Completed'
      ? 'bg-slate-500/80 text-white'
      : 'bg-[#9B7EBD]/80 text-white';

  // Category fallback data
  const categoryKey = (event.category || 'other').toLowerCase();
  const categoryMeta = categoryDescriptions[categoryKey] || categoryDescriptions.other;

  // Venue formatting
  const venueTitle = event.venue?.name || 'Venue TBA';
  const venueAddress = [event.venue?.address, event.venue?.city]
    .filter(Boolean)
    .join(', ');

  const tags = Array.isArray(event.tags) ? event.tags : [];

  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      {/* ═══════════════════════════════════════════════ */}
      {/* HERO SECTION WITH LARGE BACKGROUND & BACKDROP   */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[520px] overflow-hidden">
        {/* Background Cover Image */}
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#4A1E6D] via-[#80639E] to-[#9B7EBD]" />
        )}

        {/* Dark Backdrop Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Fade Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Hero Content Container */}
        <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-end px-6 pb-12 pt-28">
          <div className="max-w-3xl text-white space-y-4">
            
            {/* Category & Status Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full bg-[#9B7EBD]/30 border border-[#9B7EBD]/50 px-4 py-1 text-xs font-bold font-premium uppercase tracking-wider backdrop-blur-md">
                {event.category || 'Event'}
              </span>
              <span className={`inline-block rounded-full px-4 py-1 text-xs font-bold font-premium uppercase tracking-wider backdrop-blur-md ${statusBadgeBg}`}>
                {statusLabel}
              </span>
            </div>

            {/* Event Title */}
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-white">
              {event.title}
            </h1>

            {/* Category Tagline */}
            <p className="font-premium text-base text-[#D4BEE4] font-medium">
              {categoryMeta.tagline}
            </p>

            {/* Basic Info Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-premium text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-[#9B7EBD]" />
                <span>{startDateFormatted}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#9B7EBD]" />
                <span>{venueTitle}</span>
              </div>
              {event.attendeeCount !== undefined && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#9B7EBD]" />
                    <span>{event.attendeeCount} Attending</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons (Book Now without functionality) */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={()=>navigate(`/booking?type=Event&id=${event._id}`)}
                className="flex items-center gap-2 rounded-xl gradient-brand px-7 py-3.5 font-premium font-semibold text-white shadow-lg shadow-[#9B7EBD]/25 transition hover:opacity-95 cursor-pointer"
              >
                <Ticket className="w-5 h-5" />
                <span className="text-white hover:text-[#D4BEE4]">
                  Book Now at ₹{event.ticketPrice}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: event.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Event link copied to clipboard!');
                  }
                }}
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 font-premium font-semibold text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* MAIN CONTENT SECTION                            */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        
        {/* About Event & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#4A1E6D]">
              About the Event
            </h2>
            
            {/* Event Primary Description */}
            <p className="font-premium text-sm leading-relaxed text-[#4A1E6D]/80 whitespace-pre-line">
              {event.description}
            </p>

            {/* Category Default Overview */}
            <div className="p-5 rounded-2xl bg-white/70 border border-[#D4BEE4]/60 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9B7EBD]">
                <Sparkles className="w-4 h-4" />
                What to Expect
              </div>
              <p className="font-premium text-xs leading-relaxed text-[#4A1E6D]/70">
                {categoryMeta.overview}
              </p>
            </div>
          </div>

          {/* Highlights Sidebar */}
          <div className="p-6 rounded-3xl bg-white/80 border border-[#D4BEE4]/60 space-y-4 shadow-sm h-fit">
            <h3 className="font-display text-lg font-bold text-[#4A1E6D]">
              Event Highlights
            </h3>
            <ul className="space-y-3">
              {categoryMeta.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2.5 font-premium text-xs text-[#4A1E6D]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#9B7EBD] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <hr className="border-[#D4BEE4]/40" />

        {/* Event Details Grid */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#4A1E6D]">
            Event Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Start Date & Time */}
            <div className="flex items-start gap-3.5 rounded-2xl border border-[#D4BEE4]/60 bg-white/80 p-5 shadow-sm">
              <div className="p-2.5 rounded-xl bg-[#4A1E6D]/10 text-[#4A1E6D]">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <p className="font-premium text-xs font-bold text-[#4A1E6D]/50 uppercase tracking-wider">
                  Starts On
                </p>
                <p className="font-premium text-sm font-semibold text-[#4A1E6D] mt-0.5">
                  {startDateFormatted}
                </p>
              </div>
            </div>

            {/* End Date & Time */}
            <div className="flex items-start gap-3.5 rounded-2xl border border-[#D4BEE4]/60 bg-white/80 p-5 shadow-sm">
              <div className="p-2.5 rounded-xl bg-[#4A1E6D]/10 text-[#4A1E6D]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-premium text-xs font-bold text-[#4A1E6D]/50 uppercase tracking-wider">
                  Ends On
                </p>
                <p className="font-premium text-sm font-semibold text-[#4A1E6D] mt-0.5">
                  {endDateFormatted}
                </p>
              </div>
            </div>

            {/* Venue Location */}
            <div className="flex items-start gap-3.5 rounded-2xl border border-[#D4BEE4]/60 bg-white/80 p-5 shadow-sm">
              <div className="p-2.5 rounded-xl bg-[#4A1E6D]/10 text-[#4A1E6D]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-premium text-xs font-bold text-[#4A1E6D]/50 uppercase tracking-wider">
                  Venue Location
                </p>
                <p className="font-premium text-sm font-semibold text-[#4A1E6D] mt-0.5">
                  {venueTitle}
                </p>
                {venueAddress && (
                  <p className="font-premium text-xs text-[#4A1E6D]/60 mt-0.5">
                    {venueAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Category & Status */}
            <div className="flex items-start gap-3.5 rounded-2xl border border-[#D4BEE4]/60 bg-white/80 p-5 shadow-sm">
              <div className="p-2.5 rounded-xl bg-[#4A1E6D]/10 text-[#4A1E6D]">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="font-premium text-xs font-bold text-[#4A1E6D]/50 uppercase tracking-wider">
                  Category
                </p>
                <p className="font-premium text-sm font-semibold text-[#4A1E6D] capitalize mt-0.5">
                  {event.category || 'General'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Tags Section */}
        {tags.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="font-premium text-xs font-bold text-[#4A1E6D]/60 uppercase tracking-wider">
              Tags & Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-xl bg-white border border-[#D4BEE4]/60 px-3.5 py-1.5 font-premium text-xs font-semibold text-[#4A1E6D] shadow-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EventDetails;
