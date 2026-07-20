import React from "react";
import { Star, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    poster,
    genre,
    language,
    duration,
    certificate,
    rating,
    status,
  } = movie;

  return (
    <div 
      onClick={() => navigate(`/movie/${_id}`)}
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-[#0f172a] border border-slate-800/60 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40 hover:border-slate-700"
    >
      {/* Movie Poster */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-950">
        <img
          src={poster}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Soft dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />

        {/* Status Tag */}
        <span className="absolute left-3 top-3 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-200 border border-white/10">
          {status}
        </span>

        {/* Rating Tag */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-amber-500 px-2 py-0.5 text-xs font-bold text-slate-950 shadow-md">
          <Star size={11} fill="currentColor" stroke="none" />
          <span>{rating ? rating.toFixed(1) : "0.0"}</span>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4 bg-[#0f172a]">
        <h3 className="truncate text-base font-bold text-slate-100 transition-colors group-hover:text-amber-400">
          {title}
        </h3>

        <p className="mt-0.5 truncate text-xs text-slate-400">
          {genre?.join(" • ")}
        </p>

        {/* Subtle divider line */}
        <div className="my-3 border-t border-slate-800/50" />

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium">
            {language} <span className="text-slate-600 mx-0.5">•</span> {certificate}
          </span>

          <div className="flex items-center gap-1 font-medium">
            <Clock size={13} className="text-slate-500" />
            <span>{duration} min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;