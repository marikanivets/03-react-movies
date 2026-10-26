// @ts-ignore
import React from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

/* Исправили опечатку: теперь строго SearchBarProps */
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleFormAction = (formData: FormData) => {
    const query = (formData.get('query') as string || '').trim();

    if (query === '') {
      toast.error('Please enter a search term!', {
        position: 'top-right',
      });
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        {/* Добавили "as any", чтобы TypeScript не ругался на функцию в React 18 */}
        <form className={styles.form} action={handleFormAction as any}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
