import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getBookingById, cancelBooking } from '../api/bookingApi';
import {
  ArrowLeft,
  Ticket,
  CalendarDays,
  MapPin,
  User,
  Mail,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Copy,
  Check,
  AlertTriangle,
  Film,
  Sparkles,
  Utensils,
  Loader2,
  ShieldCheck
} from 'lucide-react';

const TicketDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!booking);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Cancellation state
  const [cancelling, setCancelling] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [cancelMessage, setCancelMessage] = useState(null);

  useEffect(() => {
    if (!booking) {
      const fetchBookingDetails = async () => {
        setLoading(true);
        try {
          const data = await getBookingById(id);
          // Backend returns data.booking and optional data.itemDetails
          const fetchedBooking = data.booking || {};
          if (data.itemDetails && !fetchedBooking.itemDetails) {
            fetchedBooking.itemDetails = data.itemDetails;
          }
          setBooking(fetchedBooking);
        } catch (err) {
          setError(err.response?.data?.message || err.message || 'Failed to fetch ticket details');
        } finally {
          setLoading(false);
        }
      };
      fetchBookingDetails();
    }
  }, [id, booking]);

  // Helper to extract unified item details safely
  const getItemDetails = () => {
    if (!booking) return {};

    const item = (typeof booking.itemId === 'object' && booking.itemId !== null)
      ? booking.itemId
      : (booking.itemDetails || {});

    const type = booking.itemType || (item.poster ? 'Movie' : item.location ? 'Dining' : 'Event');
    const title = item.title || item.name || 'Booking Pass';
    const image = item.poster || item.coverImage || item.image || '';

    let locationStr = 'Venue Details';
    if (type === 'Event') {
      locationStr = item.venue?.name
        ? `${item.venue.name}${item.venue.city ? ', ' + item.venue.city : ''}`
        : item.venue?.city || 'Event Venue';
    } else if (type === 'Movie') {
      locationStr = item.theatre || 'Multiplex Cinema';
    } else if (type === 'Dining') {
      locationStr = item.location || 'Dining Venue';
    }

    const dateVal = item.startDateTime || item.releaseDate || booking.createdAt;

    return { item, type, title, image, locationStr, dateVal };
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCancelBooking = async () => {
    setCancelling(true);
    setCancelMessage(null);
    try {
      const res = await cancelBooking(booking._id);
      setBooking((prev) => ({
        ...prev,
        bookingStatus: 'cancelled',
        cancelledAt: new Date()
      }));
      setCancelMessage({ type: 'success', text: res.message || 'Booking cancelled successfully' });
      setCancelConfirmOpen(false);
    } catch (err) {
      setCancelMessage({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to cancel booking'
      });
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[#9B7EBD] animate-spin" />
          <p className="font-premium text-sm text-[#4A1E6D]/70">Retrieving digital pass...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#EEEEEE] pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-8 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="font-display text-xl font-bold text-[#4A1E6D]">Ticket Not Found</h2>
          <p className="font-premium text-xs text-[#4A1E6D]/70">{error || "Unable to locate booking details."}</p>
          <button
            onClick={() => navigate('/my-tickets')}
            className="inline-flex items-center gap-2 gradient-brand text-white px-5 py-2.5 rounded-xl font-premium font-semibold text-xs transition-premium shadow-md cursor-pointer hover:opacity-95"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Tickets
          </button>
        </div>
      </div>
    );
  }

  const { type, title, image, locationStr, dateVal } = getItemDetails();
  const bookingCode = booking.bookingCode || `MS-${booking._id.slice(-6).toUpperCase()}`;
  const isCancelled = (booking.bookingStatus || '').toLowerCase() === 'cancelled';
  const isPending = (booking.bookingStatus || '').toLowerCase() === 'pending';

  return (
    <div className="min-h-screen bg-[#EEEEEE] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between gap-4 print:hidden">
          <button
            onClick={() => navigate('/my-tickets')}
            className="inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:text-[#9B7EBD] bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> My Tickets
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:bg-[#9B7EBD]/15 bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#9B7EBD]" /> Print Pass
          </button>
        </div>

        {/* System Messages Banner */}
        {cancelMessage && (
          <div
            className={`p-4 rounded-2xl border font-premium text-xs font-semibold flex items-center gap-3 animate-fade-in ${
              cancelMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}
          >
            {cancelMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0" />
            )}
            <span>{cancelMessage.text}</span>
          </div>
        )}

        {/* ─── DIGITAL TICKET PASS CARD ─── */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 overflow-hidden shadow-xl relative">
          
          {/* Top Hero Banner with Media Cover */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center gradient-brand">
                <Ticket className="w-20 h-20 text-white/30" />
              </div>
            )}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-premium font-semibold">
                {type === 'Movie' && <Film className="w-3.5 h-3.5 text-purple-300" />}
                {type === 'Event' && <Sparkles className="w-3.5 h-3.5 text-indigo-300" />}
                {type === 'Dining' && <Utensils className="w-3.5 h-3.5 text-amber-300" />}
                {type} Pass
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-premium font-bold tracking-wider uppercase backdrop-blur-md ${
                  isCancelled
                    ? 'bg-rose-500/80 text-white'
                    : isPending
                    ? 'bg-amber-500/80 text-white'
                    : 'bg-emerald-500/80 text-white'
                }`}
              >
                {isCancelled ? (
                  <>
                    <XCircle className="w-3.5 h-3.5" /> CANCELLED
                  </>
                ) : isPending ? (
                  <>
                    <Clock className="w-3.5 h-3.5" /> PENDING
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> CONFIRMED PASS
                  </>
                )}
              </span>
            </div>

            {/* Title & Pass ID Overlay */}
            <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
              <p className="text-xs font-premium text-slate-300 uppercase tracking-widest font-semibold">
                meetSphere Verified Pass
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
                {title}
              </h1>
            </div>
          </div>

          {/* Ticket Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Booking Code Bar */}
            <div className="bg-[#9B7EBD]/10 border border-[#D4BEE4]/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-premium font-bold uppercase tracking-widest text-[#4A1E6D]/60">
                  Booking Reference Code
                </p>
                <p className="font-mono text-xl font-bold text-[#4A1E6D] tracking-wider mt-0.5">
                  {bookingCode}
                </p>
              </div>

              <button
                onClick={() => handleCopyCode(bookingCode)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D4BEE4]/60 text-xs font-premium font-bold text-[#4A1E6D] hover:bg-[#9B7EBD]/10 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#9B7EBD]" /> Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Perforated Tear Line Divider */}
            <div className="relative py-2">
              <div className="border-b-2 border-dashed border-[#D4BEE4]" />
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#EEEEEE] border border-[#D4BEE4]/60" />
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#EEEEEE] border border-[#D4BEE4]/60" />
            </div>

            {/* Pass Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#4A1E6D]/10 flex items-center justify-center text-[#4A1E6D] shrink-0 mt-0.5">
                  <CalendarDays className="w-5 h-5 text-[#9B7EBD]" />
                </div>
                <div>
                  <p className="text-xs font-premium uppercase tracking-wider font-bold text-[#4A1E6D]/50">
                    Date & Time
                  </p>
                  <p className="font-premium font-semibold text-sm text-[#4A1E6D] mt-0.5">
                    {dateVal
                      ? new Date(dateVal).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      : 'Date to be confirmed'}
                  </p>
                </div>
              </div>

              {/* Location / Venue */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#4A1E6D]/10 flex items-center justify-center text-[#4A1E6D] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#9B7EBD]" />
                </div>
                <div>
                  <p className="text-xs font-premium uppercase tracking-wider font-bold text-[#4A1E6D]/50">
                    Venue / Location
                  </p>
                  <p className="font-premium font-semibold text-sm text-[#4A1E6D] mt-0.5">
                    {locationStr}
                  </p>
                </div>
              </div>

              {/* Ticket Holder */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#4A1E6D]/10 flex items-center justify-center text-[#4A1E6D] shrink-0 mt-0.5">
                  <User className="w-5 h-5 text-[#9B7EBD]" />
                </div>
                <div>
                  <p className="text-xs font-premium uppercase tracking-wider font-bold text-[#4A1E6D]/50">
                    Ticket Holder
                  </p>
                  <p className="font-premium font-semibold text-sm text-[#4A1E6D] mt-0.5">
                    {booking.attendeeName || 'Attendee'}
                  </p>
                  {booking.attendeeEmail && (
                    <p className="text-xs font-premium text-[#4A1E6D]/60 truncate">
                      {booking.attendeeEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Pass Quantity & Type */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#4A1E6D]/10 flex items-center justify-center text-[#4A1E6D] shrink-0 mt-0.5">
                  <Ticket className="w-5 h-5 text-[#9B7EBD]" />
                </div>
                <div>
                  <p className="text-xs font-premium uppercase tracking-wider font-bold text-[#4A1E6D]/50">
                    Pass Details
                  </p>
                  <p className="font-premium font-semibold text-sm text-[#4A1E6D] mt-0.5">
                    {booking.quantity || 1} {type === 'Dining' ? 'Guest Reservations' : 'Tickets'}
                  </p>
                </div>
              </div>

            </div>

            {/* Payment Summary Box */}
            <div className="bg-white/60 border border-[#D4BEE4]/60 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-premium font-bold text-[#4A1E6D]/70 uppercase tracking-wider">
                  <CreditCard className="w-4 h-4 text-[#9B7EBD]" /> Payment Summary
                </div>
                <span className="text-xs font-premium font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {booking.paymentStatus === 'completed' ? 'PAID' : booking.paymentStatus?.toUpperCase() || 'PAID'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-premium pt-1">
                <div>
                  <p className="text-[#4A1E6D]/50 font-semibold">Total Amount</p>
                  <p className="font-bold text-[#4A1E6D] text-sm mt-0.5">₹{booking.totalAmount || 0}</p>
                </div>
                <div>
                  <p className="text-[#4A1E6D]/50 font-semibold">Payment Method</p>
                  <p className="font-semibold text-[#4A1E6D] uppercase mt-0.5">{booking.paymentMethod || 'Card'}</p>
                </div>
                {booking.paymentId && (
                  <div>
                    <p className="text-[#4A1E6D]/50 font-semibold">Transaction ID</p>
                    <p className="font-mono font-medium text-[#4A1E6D] truncate mt-0.5">{booking.paymentId}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Security Guarantee Footer */}
            <div className="flex items-center justify-center gap-2 pt-2 text-[#4A1E6D]/50 font-premium text-xs">
              <ShieldCheck className="w-4 h-4 text-[#9B7EBD]" />
              <span>Authentic meetSphere Digital Pass • Non-Transferable</span>
            </div>

          </div>
        </div>

        {/* Cancellation Section (if booking is not already cancelled) */}
        {!isCancelled && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-[#D4BEE4]/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-bold text-sm text-[#4A1E6D]">Need to Cancel this Ticket?</h4>
              <p className="font-premium text-xs text-[#4A1E6D]/60 mt-0.5">
                You can cancel your booking before the event starts. Refund will be processed to original payment method.
              </p>
            </div>

            <button
              onClick={() => setCancelConfirmOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-premium font-semibold text-xs hover:bg-rose-100 transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Cancel Booking
            </button>
          </div>
        )}

      </div>

      {/* Cancellation Confirmation Modal */}
      {cancelConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#D4BEE4] p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-[#4A1E6D]">Cancel Booking?</h3>
              <p className="font-premium text-xs text-[#4A1E6D]/70 leading-relaxed">
                Are you sure you want to cancel your pass for <strong>{title}</strong>? This action will release your tickets.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCancelConfirmOpen(false)}
                disabled={cancelling}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 font-premium font-semibold text-xs text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Keep Ticket
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={cancelling}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-premium font-semibold text-xs hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {cancelling ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Cancelling...
                  </>
                ) : (
                  'Yes, Cancel'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TicketDetails;
