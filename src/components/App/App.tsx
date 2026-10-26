// @ts-ignore
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMoviesByQuery, Movie } from '../../services/movieService';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setMovies([]);

      const data = await fetchMoviesByQuery(query);

      if (data.length === 0) {
        toast.error('No movies found for your request.', { position: 'top-right' });
        return;
      }

      setMovies(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        {movies.length > 0 && <MovieGrid movies={movies} onSelect={setSelectedMovie} />}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <Toaster />
    </div>
  );
}
