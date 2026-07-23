import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postMovies } from "../api/movieApi";
import { Film, ArrowLeft, Loader2, Image } from "lucide-react";

function AddMoviePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [posterPreview, setPosterPreview] = useState("");

  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    trailer: "",
    language: "",
    duration: "",
    releaseDate: "",
    certificate: "U",
    director: "",
    status: "Upcoming",
    genre: "",
    poster: null,
    ticketPrice: 0,
    totalTickets: 0,
    theatre: "",
  });

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMovieData({ ...movieData, poster: file });
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("title", movieData.title);
      formData.append("description", movieData.description);
      formData.append("trailer", movieData.trailer);
      formData.append("language", movieData.language);
      formData.append("duration", movieData.duration);
      formData.append("releaseDate", movieData.releaseDate);
      formData.append("certificate", movieData.certificate);
      formData.append("director", movieData.director);
      formData.append("status", movieData.status);
      formData.append("genre", movieData.genre);
      formData.append("ticketPrice", movieData.ticketPrice);
      formData.append("totalTickets", movieData.totalTickets);
      formData.append("theatre", movieData.theatre);

      if (movieData.poster) {
        formData.append("poster", movieData.poster);
      }

      await postMovies(formData);
      setSuccess(true);
      navigate("/movies");
    } catch (err) {
      console.error("Error creating movie:", err);
      setError(err.response?.data?.message || "Failed to add movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:text-[#9B7EBD] bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="text-center mb-8 space-y-2">
            <div className="p-3 bg-[#4A1E6D]/10 rounded-2xl inline-flex text-[#4A1E6D] mb-1">
              <Film className="w-6 h-6" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Add Movie Listing</h1>
            <p className="font-premium text-sm text-[#4A1E6D]/70">List a new movie release or screening on meetSphere.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-premium font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Movie Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Avengers: Secret Wars"
                value={movieData.title}
                onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Description *</label>
              <textarea
                required
                rows={3}
                placeholder="Brief synopsis of the movie..."
                value={movieData.description}
                onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Theatre / Multiplex *</label>
                <input
                  type="text"
                  required
                  placeholder="PVR Phoenix"
                  value={movieData.theatre}
                  onChange={(e) => setMovieData({ ...movieData, theatre: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Ticket Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="250"
                  value={movieData.ticketPrice}
                  onChange={(e) => setMovieData({ ...movieData, ticketPrice: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Total Tickets Capacity *</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="150"
                  value={movieData.totalTickets}
                  onChange={(e) => setMovieData({ ...movieData, totalTickets: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Language *</label>
                <input
                  type="text"
                  required
                  placeholder="English, Hindi"
                  value={movieData.language}
                  onChange={(e) => setMovieData({ ...movieData, language: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Poster Image *</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={handlePosterChange}
                className="w-full text-xs font-premium text-[#4A1E6D] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#D4BEE4] file:bg-[#9B7EBD]/15 file:text-[#4A1E6D] hover:file:bg-[#9B7EBD]/25"
              />
              {posterPreview && (
                <img src={posterPreview} alt="Poster preview" className="mt-2 max-h-40 rounded-xl border border-[#D4BEE4]" />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-brand text-white font-premium font-bold py-3.5 px-6 rounded-xl hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Movie"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMoviePage;
