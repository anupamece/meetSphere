import React, { useEffect, useState } from "react";
import { getAllDining } from "../api/diningApi";
import DiningCard from "../components/DiningCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/home/Footer";
import { Search, Utensils } from "lucide-react";

const Dining = () => {
  const [diningSpots, setDiningSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDiningSpots = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllDining();
        setDiningSpots(Array.isArray(data.dining) ? data.dining : []);
      } catch (err) {
        console.error("Error fetching dining spots:", err);
        setError(err.response?.data?.message || "Failed to load dining venues.");
      } finally {
        setLoading(false);
      }
    };
    fetchDiningSpots();
  }, []);

  // Filter spots by search query
  const filteredSpots = diningSpots.filter((spot) => {
    const query = searchQuery.toLowerCase();
    return (
      spot.name?.toLowerCase().includes(query) ||
      spot.location?.toLowerCase().includes(query) ||
      spot.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#4A1E6D]">
      
      {/* ═══════════════════════════════════════════════ */}
      {/* HERO SECTION WITH BLACK BACKDROP EFFECT         */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[420px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
          alt="Dining Hero Backdrop"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Black Backdrop Overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Gradient Fade Overlay into Main #EEEEEE Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#EEEEEE] via-black/40 to-transparent" />

        {/* Hero Content & Search Bar */}
        <div className="relative z-10 flex min-h-[420px] max-w-7xl mx-auto flex-col items-center justify-center px-6 text-center pt-16 pb-12">
          
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#D4BEE4] backdrop-blur-md border border-white/10">
            <Utensils className="w-3.5 h-3.5 text-[#9B7EBD]" />
            MeetSphere Culinary
          </span>

          <h1 className="font-display text-4xl font-bold text-white md:text-6xl tracking-tight max-w-3xl">
            Seamlessly Crafted Dining Experiences
          </h1>

          <p className="mt-3 max-w-xl font-premium text-sm text-slate-300">
            Discover premier restaurants, explore curated tasting menus, and reserve your table in seconds.
          </p>

          {/* Search Bar with Black Backdrop Effect */}
          <div className="mt-8 flex w-full max-w-xl items-center rounded-2xl border border-white/20 bg-black/40 p-2 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-2.5 px-3 text-slate-300 flex-1">
              <Search className="w-5 h-5 text-[#9B7EBD] shrink-0" />
              <input
                type="text"
                placeholder="Search by restaurant name, cuisine or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent font-premium text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button className="rounded-xl gradient-brand px-6 py-2.5 font-premium text-xs font-bold text-white transition hover:opacity-95 shadow-md">
              Search
            </button>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* MAIN CONTENT & DINING CARDS GRID                 */}
      {/* ═══════════════════════════════════════════════ */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        
        {/* Section Title & Counter */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D4BEE4]/60">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#4A1E6D]">
              Explore Dining Spots
            </h2>
            <p className="font-premium text-xs text-[#4A1E6D]/70 mt-0.5">
              Handpicked dining venues and popup culinary experiences
            </p>
          </div>
          <span className="text-xs font-premium font-semibold px-3 py-1 rounded-full bg-[#4A1E6D]/10 text-[#4A1E6D] border border-[#D4BEE4]/60">
            {filteredSpots.length} {filteredSpots.length === 1 ? "venue" : "venues"}
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <LoadingSpinner message="Fetching dining venues..." />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center text-sm font-semibold text-rose-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredSpots.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#D4BEE4]/80 bg-white/70 p-12 text-center shadow-sm">
            <Utensils className="mx-auto w-10 h-10 text-[#9B7EBD] mb-3" />
            <p className="font-display text-xl font-semibold text-[#4A1E6D]">
              No dining spots found.
            </p>
            <p className="mt-1 font-premium text-xs text-[#4A1E6D]/60">
              Try adjusting your search query or browse back later.
            </p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && filteredSpots.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredSpots.map((spot) => (
              <DiningCard key={spot._id} dining={spot} />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dining;