import React, { useState, useEffect } from 'react';
import MovieCard from '../components/movies/MovieCard';
import { getMovies } from '../api/movieApi';
import LoadingSpinner from '../components/common/LoadingSpinner';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setError('');
        const data = await getMovies();
        setMovies(Array.isArray(data.movies) ? data.movies : []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner message="Loading movie screenings..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-rose-500 font-premium font-semibold">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="text-center py-20 text-slate-500 font-premium">No movies available currently.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Movie Screenings</h1>
        <p className="font-premium text-sm text-[#4A1E6D]/70 mt-1">Book tickets for upcoming movie screenings in theatres near you.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;
