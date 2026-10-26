// @ts-ignore
import React from 'react';
import { Movie } from '../../services/movieService';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item} onClick={() => onSelect(movie)}>
          <div className={css.card}>
            {movie.poster_path ? (
              <img
                className={css.image}
                src={`https://tmdb.org{movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            ) : (
              <div className={css.noImage}>No Poster Available</div>
            )}
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
