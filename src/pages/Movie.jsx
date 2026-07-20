import React from 'react'
import MovieCard from '../components/MovieCard'
import { useState, useEffect } from 'react';
import { getMovies } from '../api/movieApi';

function Movie() {
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

  if (loading) return <div className="text-center py-10 text-slate-500">Loading movies...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (movies.length === 0) return <div className="text-center py-10 text-slate-500">No movies available.</div>;

  return (
    /* Centers the overall section, but keeps the cards inside aligned to the left */
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  )
}

export default Movie;