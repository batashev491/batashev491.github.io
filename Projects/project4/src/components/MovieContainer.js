'use client';

import { useState, useEffect } from 'react';
import MovieDetails from '@/components/MovieDetails';

export default function MovieContainer({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    console.log(favorites);
    setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [movie]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');

    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id != movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
      <MovieDetails
        movie={movie}
        onAddToFavorites={handleAddToFavorites}
        isFavorite={isFavorite}
      />
  );
} 