'use client';

import { useState, useEffect } from 'react';

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  };

  return (
    <section className="favorites-section">
      <h2 className="favorites-title">My Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="favorites-empty">No favorite movies added yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-poster.png'}
                alt={movie.title}
                className="movie-image"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <button
                  onClick={() => removeFromFavorites(movie.id)}
                  className="remove-button"
                >
                  Remove from favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoriteMovies; 