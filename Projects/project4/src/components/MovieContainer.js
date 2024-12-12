'use client';

import { useState, useEffect } from 'react';
import MovieDetails from '@/components/MovieDetails';

export default function MovieContainer({ movie }) {
  // State to track if current movie is in favorites
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if movie is in favorites when component mounts or movie changes
  useEffect(() => {
    // Get favorites from localStorage, default to empty array if none exist
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    console.log(favorites);
    // Check if current movie exists in favorites
    setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [movie]);

  // Handle adding/removing movies from favorites
  const handleAddToFavorites = () => {
    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');

    if (isFavorite) {
      // If movie is already favorite, remove it
      const updatedFavorites = favorites.filter(fav => fav.id != movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // If movie is not favorite, add it
      favorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    // Main container with black background
    <div className='movie-container bg-black'>
      <MovieDetails
        movie={movie}
        onAddToFavorites={handleAddToFavorites}
        isFavorite={isFavorite}
      />
    </div>
  );
} 