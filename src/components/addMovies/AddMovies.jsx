import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postMovies } from "../../api/movieApi";
import { Film, ArrowLeft, Loader2, Image } from "lucide-react";

function AddMovies() {
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
    formData.append("poster", movieData.poster);

    try {
      const response = await postMovies(formData);
      console.log(response);
      setSuccess(true);

      setMovieData({
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
      setPosterPreview("");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to add movie. Please check required fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:text-[#9B7EBD] bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Card Container */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Subtle Top-Right Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#9B7EBD]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Form Header */}
          <div className="text-center mb-8 space-y-2 relative z-10">
            <div className="p-3 bg-[#4A1E6D]/10 rounded-2xl inline-flex text-[#4A1E6D] mb-2">
              <Film className="w-6 h-6" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Add Movie Screening</h1>
            <p className="font-premium text-sm text-[#4A1E6D]/70">
              List a theatrical movie release, premiere, or film festival on meetSphere.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-premium font-semibold text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-600 text-xs font-premium font-semibold text-center animate-fade-in">
              Movie listing added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

            {/* ─── Section 1: Overview ─── */}
            <div className="space-y-5">
              <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                Movie Information
              </h3>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                  Movie Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Inception"
                  value={movieData.title}
                  onChange={(e) =>
                    setMovieData({ ...movieData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                    font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                    focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                  Synopsis / Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Brief storyline or overview of the movie..."
                  value={movieData.description}
                  onChange={(e) =>
                    setMovieData({ ...movieData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                    font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                    focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 resize-none"
                />
              </div>

              {/* Trailer & Director */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Trailer Link (URL)
                  </label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/watch?v=..."
                    value={movieData.trailer}
                    onChange={(e) =>
                      setMovieData({ ...movieData, trailer: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Director
                  </label>
                  <input
                    type="text"
                    placeholder="Christopher Nolan"
                    value={movieData.director}
                    onChange={(e) =>
                      setMovieData({ ...movieData, director: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* ─── Section 2: Movie Metadata ─── */}
            <div className="space-y-5">
              <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                Release & Classification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Language *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="English, Hindi"
                    value={movieData.language}
                    onChange={(e) =>
                      setMovieData({ ...movieData, language: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Duration (Minutes) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="148"
                    value={movieData.duration}
                    onChange={(e) =>
                      setMovieData({ ...movieData, duration: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Release Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={movieData.releaseDate}
                    onChange={(e) =>
                      setMovieData({ ...movieData, releaseDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Genre (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Sci-Fi, Action, Thriller"
                    value={movieData.genre}
                    onChange={(e) =>
                      setMovieData({ ...movieData, genre: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Certificate Rating
                  </label>
                  <select
                    value={movieData.certificate}
                    onChange={(e) =>
                      setMovieData({
                        ...movieData,
                        certificate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 cursor-pointer"
                  >
                    <option value="U">U (Universal)</option>
                    <option value="UA">UA (Parental Guidance)</option>
                    <option value="A">A (Adults Only)</option>
                    <option value="S">S (Special Audience)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Screening Status
                  </label>
                  <select
                    value={movieData.status}
                    onChange={(e) =>
                      setMovieData({
                        ...movieData,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 cursor-pointer"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Now Showing">Now Showing</option>
                    <option value="Ended">Ended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ─── Section 3: Media ─── */}
            <div className="space-y-5">
              <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                Movie Artwork
              </h3>

              <div className="space-y-2">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                  Movie Poster *
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handlePosterChange}
                  className="block w-full text-sm font-premium text-[#4A1E6D]/70
                    file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border
                    file:border-[#D4BEE4] file:text-xs file:font-semibold file:font-premium
                    file:bg-[#9B7EBD]/10 file:text-[#4A1E6D] file:cursor-pointer
                    hover:file:bg-[#9B7EBD]/20 transition-all"
                />
                {posterPreview && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[#D4BEE4]/60 max-w-xs bg-[#EEEEEE]/50">
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      className="w-full max-h-56 object-cover"
                    />
                  </div>
                )}
              </div>


              {/* Ticket Price & Total Tickets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Theatre / Venue *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="PVR Phoenix Mall, Screen 2"
                    value={movieData.theatre}
                    onChange={(e) => setMovieData({ ...movieData, theatre: e.target.value })}
                    className="block w-full text-sm font-premium text-[#4A1E6D]/70 border border-[#D4BEE4] rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Ticket Price *
                  </label>
                  <input
                    type="number"
                    placeholder="Enter ticket price"
                    value={movieData.ticketPrice}
                    onChange={(e) => setMovieData({ ...movieData, ticketPrice: parseFloat(e.target.value) || 0 })}
                    className="block w-full text-sm font-premium text-[#4A1E6D]/70 border border-[#D4BEE4] rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                  />
                </div>
                <div className="flex-col">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Total Tickets *
                  </label>
                  <input
                    type="number"
                    placeholder="Enter total number of tickets"
                    value={movieData.totalTickets}
                    onChange={(e) => setMovieData({ ...movieData, totalTickets: parseInt(e.target.value) || 0 })}
                    className="block w-full text-sm font-premium text-[#4A1E6D]/70 border border-[#D4BEE4] rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full gradient-brand text-white font-premium font-semibold py-3.5 px-6
                rounded-xl hover:opacity-95 transition-premium shadow-md shadow-[#9B7EBD]/20
                flex items-center justify-center gap-2 cursor-pointer ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding Movie...
                </>
              ) : (
                "Add Movie Listing"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMovies;
