import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  CalendarDays,
  Play,
  Ticket,
  Languages,
  User,
} from "lucide-react";
import { movieDetails } from "../api/movieApi";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import SeatSelectionModal from "../components/movies/SeatSelectionModal.jsx";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await movieDetails(id);
        setMovie(response.movie);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!movie) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-2xl font-semibold text-slate-700">
          Movie not found
        </h2>
      </div>
    );
  }

  const formattedDate = new Date(movie.releaseDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  const formattedDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const handleBookTickets = () => {
    setIsSeatModalOpen((prev) => !prev);
  };
  const handleCloseSeatModal = () => {
    setIsSeatModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative min-h-[520px] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-end px-6 pb-12 pt-24">
          <div className="max-w-3xl text-white space-y-4">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
              {movie.status}
            </span>

            <h1 className="text-4xl font-bold md:text-6xl">
              {movie.title}
            </h1>

            <div className="flex items-center gap-2">
              <Star size={22} fill="currentColor" className="text-yellow-400" />
              <span className="text-lg font-semibold">{movie.rating || 0}/10</span>
              {movie.totalReviews > 0 && (
                <span className="text-sm text-slate-300">({movie.totalReviews} reviews)</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span>{movie.language}</span>
              <span>•</span>
              <span>{formattedDuration}</span>
              <span>•</span>
              <span>{movie.certificate}</span>
              <span>•</span>
              <span>{Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Play size={19} />
                  Watch Trailer
                </a>
              )}

              <button
                onClick={handleBookTickets}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 cursor-pointer shadow-md"
              >
                <Ticket size={19} />
                Book Tickets
              </button>
              <span className="text-xs font-premium text-slate-300">
                starting from ₹{movie.ticketPrice} onwards
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {isSeatModalOpen && (
        <SeatSelectionModal 
          movie={movie}
          onClose={handleCloseSeatModal}
        />
      )}

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">About the Movie</h2>
          <p className="mt-4 leading-7 text-slate-600">{movie.description}</p>
        </div>

        <hr className="my-10 border-slate-200" />

        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Movie Details</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <User className="text-primary" />
              <div>
                <p className="text-xs text-slate-500">Director</p>
                <p className="font-semibold text-slate-900">{movie.director || "Not available"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <CalendarDays className="text-primary" />
              <div>
                <p className="text-xs text-slate-500">Release Date</p>
                <p className="font-semibold text-slate-900">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <Clock className="text-primary" />
              <div>
                <p className="text-xs text-slate-500">Duration</p>
                <p className="font-semibold text-slate-900">{formattedDuration}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <Languages className="text-primary" />
              <div>
                <p className="text-xs text-slate-500">Language</p>
                <p className="font-semibold text-slate-900">{movie.language}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MovieDetailPage;
