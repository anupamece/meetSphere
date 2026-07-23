import React from "react";
import { MapPin, CalendarDays } from "lucide-react";

const BookingSummaryCard = ({
  itemImage,
  title,
  meta,
  itemType,
  availableTickets,
  soldPercent,
  price,
  quantity,
  totalAmount,
  isFree,
}) => {
  return (
    <div className="lg:sticky lg:top-20">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 overflow-hidden shadow-sm">
        {/* Image */}
        {itemImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={itemImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Badge */}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-premium font-semibold">
              {meta.icon}
              {meta.label}
            </span>
            {/* Title overlay */}
            <div className="absolute bottom-3 left-4 right-4">
              <h2 className="font-display text-xl font-bold text-white leading-tight line-clamp-2">
                {title}
              </h2>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="p-5 space-y-3">
          {!itemImage && (
            <h2 className="font-display text-xl font-bold text-[#4A1E6D]">
              {title}
            </h2>
          )}

          {meta.subtitle && (
            <div className="flex items-center gap-2 text-sm text-[#4A1E6D]/70 font-premium">
              <MapPin className="w-3.5 h-3.5 text-[#9B7EBD]" />
              {meta.subtitle}
            </div>
          )}

          {meta.date && (
            <div className="flex items-center gap-2 text-sm text-[#4A1E6D]/70 font-premium">
              <CalendarDays className="w-3.5 h-3.5 text-[#9B7EBD]" />
              {new Date(meta.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          )}

          {/* Availability bar (not for dining) */}
          {itemType !== "Dining" && (
            <div className="pt-2">
              <div className="flex justify-between text-xs font-premium mb-1.5">
                <span className="text-[#4A1E6D]/60">
                  {availableTickets} tickets left
                </span>
                <span className="text-[#9B7EBD] font-bold">
                  {soldPercent}% sold
                </span>
              </div>
              <div className="h-1.5 bg-[#D4BEE4]/30 rounded-full overflow-hidden">
                <div
                  className="h-full gradient-brand rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(soldPercent, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Price summary */}
          <div className="pt-3 border-t border-[#D4BEE4]/40 space-y-2">
            <div className="flex justify-between font-premium text-sm">
              <span className="text-[#4A1E6D]/60">
                {isFree ? "Free" : `₹${price}`} × {quantity}{" "}
                {itemType === "Dining" ? "guests" : "tickets"}
              </span>
              <span className="text-[#4A1E6D] font-semibold">
                {isFree ? "FREE" : `₹${totalAmount}`}
              </span>
            </div>

            {!isFree && (
              <div className="flex justify-between font-premium text-base font-bold">
                <span className="text-[#4A1E6D]">Total</span>
                <span className="gradient-text text-lg">₹{totalAmount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
