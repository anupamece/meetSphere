import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyBookings } from '../api/bookingApi';
import {
  Ticket,
  Search,
  CalendarDays,
  MapPin,
  Clock,
  ChevronRight,
  Film,
  Sparkles,
  Utensils,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const MyTicketsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyTickets = async () => {
      setLoading(true);
      try {
        const data = await getMyBookings();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load tickets');
      } fontFinally: {
        setLoading(false);
      }
    };
    fetchMyTickets();
  }, []);

  // Correct syntax fix
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const data = await getMyBookings();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleClick = (booking) => {
    navigate(`/booking/${booking._id}`, {
      state: { booking },
    });
  };

  const getItemDetails = (booking) => {
    const item = (typeof booking?.itemId === 'object' && booking.itemId !== null)
      ? booking.itemId
      : (booking?.itemDetails || {});

    const type = booking?.itemType || (item.poster ? 'Movie' : item.location ? 'Dining' : 'Event');
    const title = item.title || item.name || 'Booking Pass';
    const image = item.poster || item.coverImage || item.image || '';

    let location = 'Venue Details';
    if (type === 'Event') {
      location = item.venue?.name
        ? `${item.venue.name}${item.venue.city ? ', ' + item.venue.city : ''}`
        : item.venue?.city || 'Event Venue';
    } else if (type === 'Movie') {
      location = item.theatre || 'Multiplex Cinema';
    } else if (type === 'Dining') {
      location = item.location || 'Dining Venue';
    }

    const dateVal = item.startDateTime || item.releaseDate || booking?.createdAt;

    return { item, type, title, image, location, dateVal };
  };

  const filteredBookings = bookings.filter((booking) => {
    const { title, location, type } = getItemDetails(booking);
    const matchesTab = activeTab === 'All' || type.toLowerCase() === activeTab.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      title.toLowerCase().includes(searchLower) ||
      location.toLowerCase().includes(searchLower) ||
      (booking.bookingCode && booking.bookingCode.toLowerCase().includes(searchLower)) ||
      booking._id.toLowerCase().includes(searchLower);

    return matchesTab && matchesSearch;
  });

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Movie':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
            <Film className="w-3.5 h-3.5" /> Movie Pass
          </span>
        );
      case 'Dining':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
            <Utensils className="w-3.5 h-3.5" /> Dining Pass
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5" /> Event Pass
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    const lowerStatus = (status || 'confirmed').toLowerCase();
    if (lowerStatus === 'cancelled') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
          <XCircle className="w-3.5 h-3.5" /> Cancelled
        </span>
      );
    }
    if (lowerStatus === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
          <Clock className="w-3.5 h-3.5" /> Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D4BEE4]/40 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B7EBD]/15 text-[#4A1E6D] font-premium font-bold text-xs uppercase tracking-wider mb-2">
              <Ticket className="w-4 h-4 text-[#9B7EBD]" /> Digital Wallet
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#4A1E6D]">
              My Tickets & Passes
            </h1>
            <p className="font-premium text-sm text-[#4A1E6D]/70 mt-1">
              Access your booked events, movies, and dining reservations in one place.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#D4BEE4]/60 shadow-sm flex items-center gap-3 self-start md:self-auto">
            <div className="w-9 h-9 rounded-xl bg-[#4A1E6D]/10 flex items-center justify-center text-[#4A1E6D] font-bold text-sm">
              {bookings.length}
            </div>
            <div>
              <p className="text-xs font-premium text-[#4A1E6D]/60 uppercase tracking-wider font-bold">Total Bookings</p>
              <p className="text-sm font-premium font-semibold text-[#4A1E6D]">Active Passes</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-[#D4BEE4]/60 w-full sm:w-auto overflow-x-auto">
            {['All', 'Event', 'Movie', 'Dining'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-premium font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'gradient-brand text-white shadow-sm shadow-[#9B7EBD]/30'
                    : 'text-[#4A1E6D]/70 hover:text-[#4A1E6D] hover:bg-[#9B7EBD]/10'
                }`}
              >
                {tab === 'All' ? 'All Tickets' : `${tab}s`}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B7EBD]" />
            <input
              type="text"
              placeholder="Search by title or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-[#D4BEE4]/60 rounded-2xl font-premium text-xs text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
            />
          </div>
        </div>

        {loading && (
          <div className="py-20 text-center space-y-4">
            <Loader2 className="w-10 h-10 text-[#9B7EBD] animate-spin mx-auto" />
            <p className="font-premium text-sm text-[#4A1E6D]/60">Loading your tickets...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center max-w-lg mx-auto space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="font-display text-lg font-bold text-rose-800">Failed to Load Tickets</h3>
            <p className="font-premium text-xs text-rose-600">{error}</p>
          </div>
        )}

        {!loading && !error && filteredBookings.length === 0 && (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-12 text-center max-w-md mx-auto space-y-4 my-8">
            <div className="w-16 h-16 bg-[#9B7EBD]/15 rounded-3xl flex items-center justify-center text-[#4A1E6D] mx-auto">
              <Ticket className="w-8 h-8 text-[#9B7EBD]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#4A1E6D]">No Tickets Found</h3>
            <p className="font-premium text-xs text-[#4A1E6D]/60 leading-relaxed">
              {searchTerm || activeTab !== 'All'
                ? "No passes match your current filter or search criteria."
                : "You haven't booked any passes yet. Explore events and movies to get started!"}
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="mt-2 inline-flex items-center gap-2 gradient-brand text-white px-5 py-2.5 rounded-xl font-premium font-semibold text-xs transition-premium shadow-md cursor-pointer hover:opacity-95"
            >
              Explore Events
            </button>
          </div>
        )}

        {!loading && !error && filteredBookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => {
              const { type, title, image, location, dateVal } = getItemDetails(booking);
              const bookingCode = booking.bookingCode || `MS-${booking._id.slice(-6).toUpperCase()}`;

              return (
                <div
                  key={booking._id}
                  onClick={() => handleClick(booking)}
                  className="group bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col sm:flex-row relative"
                >
                  <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-slate-900 shrink-0">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center gradient-brand p-4 text-center">
                        <Ticket className="w-12 h-12 text-white/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/30" />
                    <div className="absolute top-3 left-3">
                      {getTypeBadge(type)}
                    </div>
                  </div>

                  <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#9B7EBD] tracking-wider uppercase bg-[#9B7EBD]/10 px-2.5 py-0.5 rounded-md">
                          {bookingCode}
                        </span>
                        {getStatusBadge(booking.bookingStatus)}
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#4A1E6D] group-hover:text-[#9B7EBD] transition-colors leading-snug line-clamp-2">
                        {title}
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs font-premium text-[#4A1E6D]/70">
                      {dateVal && (
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-3.5 h-3.5 text-[#9B7EBD] shrink-0" />
                          <span className="truncate">
                            {new Date(dateVal).toLocaleDateString('en-IN', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#9B7EBD] shrink-0" />
                        <span className="truncate">{location}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#D4BEE4]/40 flex items-center justify-between">
                      <div className="text-xs font-premium">
                        <span className="text-[#4A1E6D]/60">Qty: </span>
                        <span className="font-bold text-[#4A1E6D]">{booking.quantity || 1}</span>
                        <span className="text-[#4A1E6D]/40 mx-1.5">•</span>
                        <span className="font-bold text-[#4A1E6D]">₹{booking.totalAmount || 0}</span>
                      </div>

                      <span className="inline-flex items-center text-xs font-premium font-bold text-[#4A1E6D] group-hover:text-[#9B7EBD] transition-colors">
                        View Details <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EEEEEE] border border-[#D4BEE4]/60" />
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTicketsPage;
