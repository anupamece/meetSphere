import React from 'react';
import { MapPin, Utensils, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DiningCard = ({ dining }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    description,
    location,
    price,
    image,
    rating = 4.8
  } = dining || {};

  return (
    <div 
      onClick={() => navigate(`/dining/${_id}`)}
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-[#0f172a] border border-slate-800/60 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:border-slate-700"
    >
      {/* Dining Image Banner */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-950">
        <img
          src={image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Soft dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-85" />

        {/* Category Tag */}
        <span className="absolute left-3 top-3 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-200 border border-white/10 flex items-center gap-1">
          <Utensils size={10} className="text-[#9B7EBD]" />
          Dining Venue
        </span>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-0.5 rounded-md bg-[#4A1E6D]/90 border border-[#9B7EBD]/40 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white shadow-md">
          <span>₹{price}</span>
          <span className="text-[10px] text-slate-300 font-normal">/ person</span>
        </div>
      </div>

      {/* Dining Details */}
      <div className="p-4 bg-[#0f172a]">
        <h3 className="truncate text-base font-bold text-slate-100 transition-colors group-hover:text-[#9B7EBD]">
          {name}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
          <MapPin size={12} className="text-[#9B7EBD] shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {description && (
          <p className="mt-2 line-clamp-2 text-xs text-slate-400/80 leading-relaxed">
            {description}
          </p>
        )}

        {/* Subtle divider line */}
        <div className="my-3 border-t border-slate-800/50" />

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star size={12} fill="currentColor" stroke="none" />
            <span>{rating ? Number(rating).toFixed(1) : "4.8"}</span>
          </div>

          <span className="text-[11px] text-[#9B7EBD] font-semibold">
            Reserve Table →
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiningCard;
