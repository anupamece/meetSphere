import React from "react";
import { MapPin, Utensils, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DiningCard = ({ dining }) => {
  const navigate = useNavigate();
  const { _id, name, location, price, image, description } = dining;

  return (
    <div
      onClick={() => navigate(`/booking?type=Dining&id=${_id}`)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#9B7EBD]/20 hover:border-[#9B7EBD]/50 cursor-pointer"
    >
      
      {/* Tall Vertical Venue Image (Aspect 3:4) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <img
          src={image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Backdrop Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold font-premium text-slate-200 uppercase border border-white/10">
            <Utensils className="w-3 h-3 text-[#9B7EBD]" /> Dining
          </span>
        </div>

        {/* Title & Location overlay on bottom of poster */}
        <div className="absolute bottom-2.5 left-3 right-3 space-y-0.5">
          <h3 className="font-display text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-md group-hover:text-[#9B7EBD] transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 text-[11px] font-premium text-slate-300">
            <MapPin className="w-3 h-3 text-[#9B7EBD] shrink-0" />
            <span className="truncate">{location || "Location TBA"}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3.5 flex flex-col justify-between space-y-2.5 bg-slate-950">
        <div className="flex items-center justify-between text-xs font-premium text-slate-300">
          <div className="flex items-center gap-1 text-slate-400">
            <span className="uppercase tracking-wider text-[10px] font-bold">Avg / Person</span>
          </div>

          <span className="font-bold text-white text-sm">
            ₹{price || 0}
          </span>
        </div>

        <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-3.5 py-2 font-premium text-xs font-bold text-white shadow-md shadow-[#9B7EBD]/20">
          <ArrowUpRight className="w-3.5 h-3.5" /> Reserve Table
        </div>
      </div>

    </div>
  );
};

export default DiningCard;
