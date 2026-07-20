import React, { useState } from "react";
import { postMovies } from "../../api/movieApi";

function AddMovies() {
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
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    formData.append("poster", movieData.poster);

    try {
      const response = await postMovies(formData);
      console.log(response);

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
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">
        Add Movie
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Movie Title"
          value={movieData.title}
          onChange={(e) =>
            setMovieData({ ...movieData, title: e.target.value })
          }
          className="w-full rounded-xl border px-4 py-3"
        />

        <textarea
          placeholder="Description"
          value={movieData.description}
          onChange={(e) =>
            setMovieData({ ...movieData, description: e.target.value })
          }
          className="min-h-32 w-full rounded-xl border px-4 py-3"
        />

        <input
          type="text"
          placeholder="Trailer Link"
          value={movieData.trailer}
          onChange={(e) =>
            setMovieData({ ...movieData, trailer: e.target.value })
          }
          className="w-full rounded-xl border px-4 py-3"
        />

        <input
          type="text"
          placeholder="Language"
          value={movieData.language}
          onChange={(e) =>
            setMovieData({ ...movieData, language: e.target.value })
          }
          className="w-full rounded-xl border px-4 py-3"
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={movieData.duration}
          onChange={(e) =>
            setMovieData({ ...movieData, duration: e.target.value })
          }
          className="w-full rounded-xl border px-4 py-3"
        />

        <input
          type="date"
          value={movieData.releaseDate}
          onChange={(e) =>
            setMovieData({ ...movieData, releaseDate: e.target.value })
          }
          className="w-full rounded-xl border px-4 py-3"
        />

        <input
          type="text"
          placeholder="Director"
          value={movieData.director}
          onChange={(e) =>
            setMovieData({ ...movieData, director: e.target.value })
          }
          className="w-full rounded-xl border px-4 py-3"
        />

        <input
          type="text"
          placeholder="Genre (Action, Drama, Comedy)"
          value={movieData.genre}
          onChange={(e) =>
            setMovieData({ ...movieData, genre: e.target.value })
          }
          className="w-full rounded-xl border px-4 py-3"
        />

        <select
          value={movieData.certificate}
          onChange={(e) =>
            setMovieData({
              ...movieData,
              certificate: e.target.value,
            })
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="U">U</option>
          <option value="UA">UA</option>
          <option value="A">A</option>
          <option value="S">S</option>
        </select>

        <select
          value={movieData.status}
          onChange={(e) =>
            setMovieData({
              ...movieData,
              status: e.target.value,
            })
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Now Showing">Now Showing</option>
          <option value="Ended">Ended</option>
        </select>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Poster
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setMovieData({
                ...movieData,
                poster: e.target.files[0],
              })
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white hover:bg-primary/90"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovies;