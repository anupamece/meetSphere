import React from "react";
import { Minus, Plus, ArrowRight } from "lucide-react";

const StepSelectQuantity = ({
  itemType,
  quantity,
  setQuantity,
  availableTickets,
  isFree,
  price,
  totalAmount,
  canProceedStep1,
  handleNext,
}) => {
  const maxLimit = itemType === "Dining" ? 20 : availableTickets;

  return (
    <div className="relative z-10 space-y-6">
      <div className="space-y-1">
        <h3 className="font-display text-2xl font-bold text-[#4A1E6D]">
          {itemType === "Dining" ? "How many guests?" : "How many tickets?"}
        </h3>
        <p className="font-premium text-sm text-[#4A1E6D]/60">
          {itemType === "Dining"
            ? "Select the number of guests for your reservation."
            : "Select the number of tickets you'd like to book."}
        </p>
      </div>

      {/* Quantity selector */}
      <div className="flex items-center justify-center gap-6 py-8">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="w-12 h-12 rounded-2xl border border-[#D4BEE4]/60 bg-white/80 flex items-center justify-center text-[#4A1E6D] hover:bg-[#9B7EBD]/10 transition-premium disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Minus className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="font-display text-5xl font-bold gradient-text">
            {quantity}
          </span>
          <p className="font-premium text-xs text-[#4A1E6D]/50 mt-1 uppercase tracking-wider">
            {itemType === "Dining" ? "Guests" : "Tickets"}
          </p>
        </div>

        <button
          onClick={() => setQuantity((q) => Math.min(maxLimit, q + 1))}
          disabled={quantity >= maxLimit}
          className="w-12 h-12 rounded-2xl border border-[#D4BEE4]/60 bg-white/80 flex items-center justify-center text-[#4A1E6D] hover:bg-[#9B7EBD]/10 transition-premium disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Quick picks */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setQuantity(Math.min(n, maxLimit))}
            className={`px-4 py-2 rounded-xl font-premium text-sm font-semibold transition-all duration-200 cursor-pointer ${
              quantity === n
                ? "gradient-brand text-white shadow-md"
                : "bg-[#EEEEEE]/70 text-[#4A1E6D]/70 hover:bg-[#D4BEE4]/30"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="bg-[#EEEEEE]/50 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between font-premium text-sm text-[#4A1E6D]/70">
          <span>
            {isFree ? "Free entry" : `₹${price}`} × {quantity}
          </span>
          <span>{isFree ? "FREE" : `₹${totalAmount}`}</span>
        </div>
        {!isFree && (
          <>
            <div className="border-t border-[#D4BEE4]/30" />
            <div className="flex justify-between font-premium font-bold text-[#4A1E6D]">
              <span>Total</span>
              <span className="gradient-text">₹{totalAmount}</span>
            </div>
          </>
        )}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!canProceedStep1}
        className="w-full gradient-brand text-white font-premium font-semibold py-3.5 rounded-xl hover:opacity-95 transition-premium shadow-md shadow-[#9B7EBD]/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StepSelectQuantity;
