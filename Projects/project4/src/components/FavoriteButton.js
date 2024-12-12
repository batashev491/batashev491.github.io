'use client';

import { useState, useEffect } from 'react';

const FavoriteButton = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, movie];
      localStorage.setItem('favoriteMovies', JSON.stringify(newFavorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${isFavorite 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
    >
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton; 