import React from 'react';

const EventCard = ({ event,showActions=false,onDelete,onEdit }) => {
  
  const startLabel = event.startDateTime
    ? new Date(event.startDateTime).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'TBD';

  const venueLabel = [event?.venue?.name, event?.venue?.city]
    .filter(Boolean)
    .join(' • ');

  const tags = Array.isArray(event.tags) ? event.tags : [];
  

  return (
    <article
      className="group overflow-hidden rounded-3xl border border-brand-muted/60 bg-white/80 shadow-[0_18px_45px_-30px_rgba(74,30,109,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-35px_rgba(74,30,109,0.55)]"
    >
      {/* Cover Image / Gradient Fallback */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-secondary via-primary to-brand-muted">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-end p-6 text-white">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                {event.category || 'event'}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">
                {event.title}
              </h2>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark shadow-sm">
          {event.status || 'draft'}
        </span>
      </div>

      {/* Card Body */}
      <div className="space-y-4 p-6">
        {/* Category & Title */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
            {event.category || 'Event'}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-brand-dark">
            {event.title}
          </h2>
        </div>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-6 text-brand-dark/70">
          {event.description}
        </p>

        {/* Details */}
        <div className="space-y-2 text-sm text-brand-dark/75">
          <p>
            <span className="font-semibold text-brand-dark">When:</span> {startLabel}
          </p>
          <p>
            <span className="font-semibold text-brand-dark">Where:</span>{' '}
            {venueLabel || 'Venue not set'}
          </p>
          <p>
            <span className="font-semibold text-brand-dark">Attendees:</span>{' '}
            {typeof event.attendeeCount === 'number' ? event.attendeeCount : 0}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-bg px-3 py-1 text-xs font-semibold text-brand-dark"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Management Actions (only visible when showActions is true) */}
        {showActions && (
          <div className="flex gap-3 pt-3 border-t border-brand-muted/40">
            <button
              onClick={() => onEdit(event._id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                rounded-xl border border-[#D4BEE4] bg-white text-sm font-semibold
                font-premium text-[#4A1E6D] hover:bg-[#D4BEE4]/20
                hover:border-[#9B7EBD] transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414
                  a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                rounded-xl border border-rose-200 bg-white text-sm font-semibold
                font-premium text-rose-600 hover:bg-rose-50
                hover:border-rose-400 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0
                  01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0
                  00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default EventCard;
