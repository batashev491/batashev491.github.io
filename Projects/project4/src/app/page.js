'use client';
// Import necessary dependencies and components
import { useState, useEffect } from 'react';
import SearchBar from "@/components/SearchBar";
import FavoriteMovies from "@/components/FavoriteMovies";
import '@/styles/main.css';
import { searchMovies } from '@/lib/api';
import MovieCard from '@/components/MovieCard';
import { getFavorites, saveFavorites, toggleFavorite } from '@/lib/favorites';

export default function Home() {
  // State management for search results, loading state, and favorite movies
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Initialize favorites from local storage on component mount
    setFavorites(getFavorites());

    // Handler for local storage changes (for cross-tab synchronization)
    const handleStorageChange = (e) => {
      if (e.key === 'favoriteMovies') {
        setFavorites(JSON.parse(e.newValue || '[]'));
      }
    };

    // Handler for custom favorite updates event
    const handleFavoritesUpdated = (e) => {
      setFavorites(e.detail);
    };

    // Add event listeners for storage and custom events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  // Handle toggling movies in favorites list
  const handleFavoriteToggle = (movie) => {
    setFavorites(currentFavorites => {
      // Update favorites, save to storage, and dispatch event for cross-component communication
      const updatedFavorites = toggleFavorite(currentFavorites, movie);
      saveFavorites(updatedFavorites);
      window.dispatchEvent(new CustomEvent('favoritesUpdated', {
        detail: updatedFavorites
      }));
      return updatedFavorites;
    });
  };

  // Handle movie search functionality
  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      // Fetch movie results from API
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
        {/* Search bar component */}
        <SearchBar onSearch={handleSearch} />
        
        {/* Conditional rendering for loading state and search results */}
        {isLoading ? (
          <div>Loading...</div>
        ) : searchResults.length > 0 && (
          <section>
            <h2 className="favorites-title">Search Results</h2>
            <div className="search-results">
              {/* Map through search results and render MovieCard components */}
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
        
        {/* Favorites section component */}
        <FavoriteMovies
          favorites={favorites}
          onRemoveFromFavorites={handleFavoriteToggle}
        />
      </main>
    </div>
  );
}
