'use client';
import { useState, useEffect } from 'react';
import SearchBar from "@/components/SearchBar";
import FavoriteMovies from "@/components/FavoriteMovies";
import '@/styles/main.css';
import { searchMovies } from '@/lib/api';
import MovieCard from '@/components/MovieCard';
import { getFavorites, saveFavorites, toggleFavorite } from '@/lib/favorites';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
    const handleStorageChange = (e) => {
      if (e.key === 'favoriteMovies') {
        setFavorites(JSON.parse(e.newValue || '[]'));
      }
    };

    const handleFavoritesUpdated = (e) => {
      setFavorites(e.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  const handleFavoriteToggle = (movie) => {
    setFavorites(currentFavorites => {
      const updatedFavorites = toggleFavorite(currentFavorites, movie);
      saveFavorites(updatedFavorites);
      window.dispatchEvent(new CustomEvent('favoritesUpdated', {
        detail: updatedFavorites
      }));
      return updatedFavorites;
    });
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const data = await searchMovies(query);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        {isLoading ? (
          <div>Loading...</div>
        ) : searchResults.length > 0 && (
          <section>
            <h2 className="favorites-title">Search Results</h2>
            <div className="search-results">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddToFavorites={handleFavoriteToggle}
                  isFavorite={favorites.some(fav => fav.id === movie.id)}
                />
              ))}
            </div>
          </section>
        )}
        <FavoriteMovies
          favorites={favorites}
          onRemoveFromFavorites={handleFavoriteToggle}
        />
      </main>
    </div>
  );
}
