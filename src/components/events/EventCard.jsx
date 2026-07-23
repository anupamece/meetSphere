import React from 'react';
import { CalendarDays, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    category,
    coverImage,
    venue,
    startDateTime,
    ticketPrice,
  } = event;

  const formattedDate = startDateTime
    ? new Date(startDateTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'TBA';

  const formattedTime = startDateTime
    ? new Date(startDateTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'TBA';

  return (
    <div
      onClick={() => navigate(`/event/${_id}`)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#9B7EBD]/20 hover:border-[#9B7EBD]/50 cursor-pointer"
    >
      
      {/* Tall Vertical Cover Image (Aspect 3:4) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <img
          src={coverImage || '/placeholder-event.jpg'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Backdrop Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold font-premium text-slate-200 uppercase border border-white/10">
            {category || 'General'}
          </span>

          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(_id);
              }}
              className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-slate-200 border border-white/10 transition-transform duration-200 hover:scale-110 hover:bg-black active:scale-95 cursor-pointer"
              aria-label="Toggle favorite"
            >
              <Heart
                className={`h-3.5 w-3.5 transition-colors ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-rose-500'
                }`}
              />
            </button>
          )}
        </div>

        {/* Title & Meta overlay on bottom of poster */}
        <div className="absolute bottom-2.5 left-3 right-3 space-y-0.5">
          <h3 className="font-display text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-md group-hover:text-[#9B7EBD] transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-[11px] font-premium text-slate-300">
            <CalendarDays className="w-3 h-3 text-[#9B7EBD] shrink-0" />
            <span className="truncate">{formattedDate} • {formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3.5 flex flex-col justify-between space-y-2.5 bg-slate-950">
        <div className="flex items-center justify-between text-xs font-premium text-slate-300">
          <div className="flex items-center gap-1 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-[#9B7EBD]" />
            <span className="truncate max-w-[120px]">
              {venue?.name ? `${venue.name}, ${venue.city || ''}` : venue?.city || 'Location TBA'}
            </span>
          </div>

          <span className="font-bold text-white text-sm">
            {ticketPrice === 0 ? 'FREE' : `₹${ticketPrice}`}
          </span>
        </div>

        <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-3.5 py-2 font-premium text-xs font-bold text-white shadow-md shadow-[#9B7EBD]/20">
          <ArrowUpRight className="w-3.5 h-3.5" /> View Details
        </div>
      </div>

    </div>
  );
};

export default EventCard;
