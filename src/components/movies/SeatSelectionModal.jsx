import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Ticket, Armchair, Sparkles } from 'lucide-react';

const SeatSelectionModal = ({ movie, onClose }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState(
    new Set(['S1-3', 'S1-4', 'G1-5', 'G2-2', 'G2-3', 'R-4']) // Sample occupied seats for visual realism
  );
  const navigate = useNavigate();

  const silverTicketPrice = movie?.ticketPrice || 150;
  const goldTicketPrice = Math.round((movie?.ticketPrice || 150) * 1.5);
  const reclinerTicketPrice = (movie?.ticketPrice || 150) * 2;

  const hndleSeatClick = (seatNumber) => {
    if (occupiedSeats.has(seatNumber)) {
      return;
    }
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length >= 10) {
        alert('You can select a maximum of 10 seats');
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      if (seat.startsWith('R')) return total + reclinerTicketPrice;
      if (seat.startsWith('G')) return total + goldTicketPrice;
      return total + silverTicketPrice;
    }, 0);
  };

  const seatCount = selectedSeats.length;
  const totalPrice = calculateTotalPrice();

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    navigate(`/booking?type=Movie&id=${movie._id}`, {
      state: {
        selectedSeats: [...selectedSeats].sort(),
        quantity: selectedSeats.length,
        totalPrice: totalPrice,
      },
    });
    onClose();
  };

  // Tier grid configurations (Screen → Silver → Gold → Recliner)
  const silverRows = [
    { rowLabel: 'S1', seats: ['S1-1', 'S1-2', 'S1-3', 'S1-4', 'S1-5', 'S1-6', 'S1-7', 'S1-8', 'S1-9', 'S1-10', 'S1-11', 'S1-12'] },
    { rowLabel: 'S2', seats: ['S2-1', 'S2-2', 'S2-3', 'S2-4', 'S2-5', 'S2-6', 'S2-7', 'S2-8', 'S2-9', 'S2-10', 'S2-11', 'S2-12'] },
  ];

  const goldRows = [
    { rowLabel: 'G1', seats: ['G1-1', 'G1-2', 'G1-3', 'G1-4', 'G1-5', 'G1-6', 'G1-7', 'G1-8', 'G1-9', 'G1-10', 'G1-11', 'G1-12'] },
    { rowLabel: 'G2', seats: ['G2-1', 'G2-2', 'G2-3', 'G2-4', 'G2-5', 'G2-6', 'G2-7', 'G2-8', 'G2-9', 'G2-10', 'G2-11', 'G2-12'] },
  ];

  const reclinerSeats = ['R-1', 'R-2', 'R-3', 'R-4', 'R-5', 'R-6', 'R-7', 'R-8', 'R-9', 'R-10'];

  const renderSeat = (seatId, isRecliner = false) => {
    const isOccupied = occupiedSeats.has(seatId);
    const isSelected = selectedSeats.includes(seatId);

    let seatStyle = 'bg-white border-[#D4BEE4] text-[#4A1E6D] hover:bg-[#9B7EBD]/20 hover:border-[#9B7EBD] cursor-pointer';

    if (isOccupied) {
      seatStyle = 'bg-[#EEEEEE] border-gray-300 text-gray-400 cursor-not-allowed opacity-60';
    } else if (isSelected) {
      seatStyle = 'gradient-brand border-[#4A1E6D] text-white shadow-md shadow-[#9B7EBD]/30 scale-105 font-bold';
    }

    return (
      <button
        key={seatId}
        disabled={isOccupied}
        onClick={() => hndleSeatClick(seatId)}
        className={`relative transition-all duration-200 border rounded-xl font-premium text-xs font-semibold flex items-center justify-center ${
          isRecliner ? 'w-10 sm:w-12 h-10 rounded-2xl' : 'w-8 sm:w-10 h-8 sm:h-10'
        } ${seatStyle}`}
        title={`${seatId} - ${isOccupied ? 'Occupied' : isSelected ? 'Selected' : 'Available'}`}
      >
        {isRecliner ? (
          <Armchair className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#4A1E6D]'}`} />
        ) : (
          seatId.split('-')[1]
        )}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Clean Glassmorphic Container matching website colors */}
      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-6 sm:p-8 shadow-2xl text-[#4A1E6D] my-auto overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#D4BEE4]/40 pb-4 mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-premium font-bold uppercase tracking-wider text-[#9B7EBD]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{movie?.theatre || 'Multiplex Cinema'}</span>
              {movie?.certificate && (
                <span className="px-2 py-0.5 rounded-md bg-[#9B7EBD]/15 text-[#4A1E6D] border border-[#D4BEE4]/60 text-[10px]">
                  {movie.certificate}
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#4A1E6D] mt-1">
              {movie?.title || 'Select Seats'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-[#EEEEEE]/80 border border-[#D4BEE4]/60 flex items-center justify-center text-[#4A1E6D] hover:bg-[#D4BEE4]/40 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Curved Screen Banner (At top) */}
        <div className="relative mb-8 text-center">
          <div className="w-4/5 mx-auto h-2 gradient-brand rounded-full shadow-md shadow-[#9B7EBD]/20" />
          <p className="text-[11px] font-premium uppercase tracking-widest text-[#4A1E6D]/60 mt-2 font-bold">
            Screen This Way
          </p>
        </div>

        {/* ─── 3 SEAT TIERS LAYOUT: SILVER → GOLD → RECLINER ─── */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar relative z-10 pb-4">
          
          {/* TIER 1: SILVER TIER (Front / Screen Side) */}
          <div className="bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-premium border-b border-[#D4BEE4]/40 pb-2">
              <span className="font-bold text-[#4A1E6D] flex items-center gap-1.5 uppercase tracking-wider">
                <Ticket className="w-4 h-4 text-[#9B7EBD]" /> SILVER TIER
              </span>
              <span className="font-bold text-[#9B7EBD]">₹{silverTicketPrice} / seat</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {silverRows.map((row) => (
                <div key={row.rowLabel} className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="w-6 text-xs font-mono text-[#4A1E6D]/60 font-bold text-center">{row.rowLabel}</span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {row.seats.map((seatId) => renderSeat(seatId))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 2: GOLD TIER (Middle) */}
          <div className="bg-[#9B7EBD]/10 border border-[#D4BEE4]/60 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-premium border-b border-[#D4BEE4]/40 pb-2">
              <span className="font-bold text-[#4A1E6D] flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#9B7EBD]" /> GOLD TIER
              </span>
              <span className="font-bold text-[#9B7EBD]">₹{goldTicketPrice} / seat</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {goldRows.map((row) => (
                <div key={row.rowLabel} className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="w-6 text-xs font-mono text-[#4A1E6D]/60 font-bold text-center">{row.rowLabel}</span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {row.seats.map((seatId) => renderSeat(seatId))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 3: RECLINER TIER (Back / Premium) */}
          <div className="bg-[#4A1E6D]/10 border border-[#D4BEE4]/60 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-premium border-b border-[#D4BEE4]/40 pb-2">
              <span className="font-bold text-[#4A1E6D] flex items-center gap-1.5 uppercase tracking-wider">
                <Armchair className="w-4 h-4 text-[#9B7EBD]" /> RECLINER LUXURY TIER
              </span>
              <span className="font-bold text-[#9B7EBD]">₹{reclinerTicketPrice} / seat</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
              {reclinerSeats.map((seatId) => renderSeat(seatId, true))}
            </div>
          </div>

        </div>

        {/* Seat Status Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-3 border-t border-b border-[#D4BEE4]/40 text-xs font-premium text-[#4A1E6D]/70 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-white border border-[#D4BEE4]" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md gradient-brand" />
            <span className="font-bold text-[#4A1E6D]">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#EEEEEE] border border-gray-300 opacity-60" />
            <span>Occupied</span>
          </div>
        </div>

        {/* Footer Summary & Proceed CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 relative z-10">
          <div>
            <p className="text-xs font-premium text-[#4A1E6D]/70">
              Selected ({seatCount} {seatCount === 1 ? 'seat' : 'seats'}):{' '}
              <span className="font-mono font-bold text-[#4A1E6D]">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
              </span>
            </p>
            <p className="text-xl font-display font-bold text-[#4A1E6D] mt-0.5">
              Total: <span className="gradient-text">₹{totalPrice}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-[#D4BEE4]/60 bg-white text-xs font-premium font-semibold text-[#4A1E6D] hover:bg-[#EEEEEE] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={seatCount === 0}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl gradient-brand text-xs font-premium font-bold text-white shadow-md shadow-[#9B7EBD]/30 hover:opacity-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeatSelectionModal;
