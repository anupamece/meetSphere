import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, Users, Heart, Edit, Trash2, Tag } from 'lucide-react';

const EventCard = ({ event, showActions = false, onDelete, onEdit, isFavorite = false, onToggleFavorite }) => {
  const navigate = useNavigate();

  const formattedDate = event?.startDateTime
    ? new Date(event.startDateTime).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Date TBD';

  const venueLabel = [event?.venue?.name, event?.venue?.city]
    .filter(Boolean)
    .join(' • ') || 'Venue TBA';

  // Calculate Event Status
  const now = Date.now();
  const startTime = event?.startDateTime ? new Date(event.startDateTime).getTime() : 0;
  const endTime = event?.endDateTime ? new Date(event.endDateTime).getTime() : 0;

  const eventStatus =
    now < startTime
      ? 'UPCOMING'
      : now > endTime
      ? 'COMPLETED'
      : startTime > 0 && now >= startTime && now <= endTime
      ? 'LIVE NOW'
      : 'UPCOMING';

  const statusBadgeBg =
    eventStatus === 'LIVE NOW'
      ? 'bg-emerald-500 text-white'
      : eventStatus === 'COMPLETED'
      ? 'bg-slate-800/90 text-slate-300'
      : 'bg-black/60 text-slate-200 border border-white/10';

  const handleCardClick = () => {
    if (event?._id) {
      navigate(`/event/${event._id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-[#0f172a] border border-slate-800/60 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:border-slate-700"
    >
      {/* ─── Image Banner ─── */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-950">
        {event?.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-end p-6 bg-gradient-to-br from-[#4A1E6D] to-[#9B7EBD] text-white">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                {event?.category || 'Event'}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold leading-tight text-white">
                {event?.title}
              </h2>
            </div>
          </div>
        )}

        {/* Soft Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-85" />

        {/* Status Badge */}
        <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${statusBadgeBg}`}>
          {eventStatus}
        </span>

        {/* Favorite Heart Button */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(event._id);
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white transition hover:scale-110 cursor-pointer"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-rose-500'
              }`}
            />
          </button>
        )}
      </div>

      {/* Category Strip */}
      <div className="bg-[#4A1E6D]/80 px-4 py-1.5 text-xs font-bold text-white flex items-center gap-1.5 border-b border-slate-800/60 backdrop-blur-md">
        <Tag size={12} className="text-[#9B7EBD]" />
        <span className="capitalize tracking-wide">{event?.category || 'General Event'}</span>
      </div>

      {/* ─── Details Section ─── */}
      <div className="p-4 bg-[#0f172a]">
        
        {/* Single Date & Time line without "When" */}
        <p className="text-xs font-bold font-premium text-amber-400 tracking-wide">
          {formattedDate}
        </p>

        {/* Event Title */}
        <h3 className="mt-1 truncate text-base font-bold text-slate-100 transition-colors group-hover:text-[#9B7EBD] capitalize">
          {event?.title}
        </h3>

        {/* Venue Location */}
        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
          <MapPin size={12} className="text-[#9B7EBD] shrink-0" />
          <span className="truncate">{venueLabel}</span>
        </div>

        {/* Description Preview */}
        {event?.description && (
          <p className="mt-1.5 line-clamp-1 text-xs text-slate-400/80 leading-relaxed">
            {event.description}
          </p>
        )}

        {/* Divider */}
        <div className="my-3 border-t border-slate-800/50" />

        {/* Footer info: Attendees & View Details → button styled like Dining Card */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 font-medium text-slate-400">
            <Users size={12} className="text-slate-500" />
            <span>{typeof event?.attendeeCount === 'number' ? event.attendeeCount : 0} attendees</span>
          </div>

          <span className="text-[11px] text-[#9B7EBD] font-semibold group-hover:text-[#D4BEE4] transition-colors">
            View Details →
          </span>
        </div>

        {/* Host Dashboard Action Buttons */}
        {showActions && (
          <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(event._id);
              }}
              className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition cursor-pointer"
            >
              <Edit size={12} className="text-[#9B7EBD]" />
              Edit
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(event._id);
              }}
              className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-rose-900/60 bg-rose-950/40 text-xs font-semibold text-rose-300 hover:bg-rose-900/50 hover:text-white transition cursor-pointer"
            >
              <Trash2 size={12} className="text-rose-400" />
              Delete
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default EventCard;
