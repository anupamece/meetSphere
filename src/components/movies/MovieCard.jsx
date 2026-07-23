import React from 'react';
import { Star, Clock, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    poster,
    genre,
    rating,
    duration,
    certificate,
    ticketPrice,
  } = movie;

  const hours = Math.floor((duration || 0) / 60);
  const minutes = (duration || 0) % 60;
  const formattedDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div
      onClick={() => navigate(`/movie/${_id}`)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#9B7EBD]/20 hover:border-[#9B7EBD]/50 cursor-pointer"
    >
      
      {/* Compact Vertical Poster (Aspect 3:4) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <img
          src={poster || '/placeholder-movie.jpg'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Backdrop Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

        {/* Certificate Badge */}
        {certificate && (
          <span className="absolute top-2.5 left-2.5 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold font-premium text-slate-200 uppercase border border-white/10">
            {certificate}
          </span>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-xs font-bold text-yellow-400 border border-white/10">
          <Star className="w-3 h-3 fill-yellow-400" />
          <span>{rating || 0}</span>
        </div>

        {/* Title & Genre overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 space-y-0.5">
          <h3 className="font-display text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-md group-hover:text-[#9B7EBD] transition-colors">
            {title}
          </h3>
          <p className="text-[11px] font-premium text-slate-300 truncate">
            {Array.isArray(genre) ? genre.join(', ') : genre || 'Cinema'}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3.5 flex flex-col justify-between space-y-2.5 bg-slate-950">
        <div className="flex items-center justify-between text-xs font-premium text-slate-300">
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-[#9B7EBD]" />
            <span>{formattedDuration}</span>
          </div>

          <span className="font-bold text-white text-sm">
            ₹{ticketPrice || 0}
          </span>
        </div>

        <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-3.5 py-2 font-premium text-xs font-bold text-white shadow-md shadow-[#9B7EBD]/20">
          <Ticket className="w-3.5 h-3.5" /> Book Movie
        </div>
      </div>

    </div>
  );
};

export default MovieCard;
