import API from "./axiosInstance";

export const postMovies = async (movieData) => {
  const response = await API.post("/movies/postMovies", movieData);
  return response.data;
}
export const getMovies = async () => {
  const response = await API.get("/movies/getMovies");
  return response.data;
}
export const movieDetails = async (id) => {
  const response = await API.get(`/movies/movieDetails/${id}`);
  return response.data;
}