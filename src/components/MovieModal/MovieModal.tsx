// @ts-ignore
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById('root') || document.body;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        {movie.backdrop_path ? (
          <img
            src={`https://tmdb.org${movie.backdrop_path}`}
            alt={movie.title}
            className={css.image}
          />
        ) : (
          <div className={css.noImage}>No Backdrop Available</div>
        )}
        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.overview}>{movie.overview}</p>
          <p className={css.info}>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className={css.info}>
            <strong>Rating:</strong> {movie.vote_average} / 10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
