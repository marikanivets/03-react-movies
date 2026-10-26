import axios from 'axios';
import { Movie } from '../types/movie';

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieInstance = axios.create({
  baseURL: 'https://themoviedb.org',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: 'application/json',
  },
});

export const fetchMoviesByQuery = async (query: string): Promise<Movie[]> => {
  const response = await movieInstance.get<TMDBResponse>('/search/movie', {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  
  return response.data.results;
};
