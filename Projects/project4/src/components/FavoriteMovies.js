'use client';
import MovieCard from './MovieCard';

// Component to display user's favorite movies
// Props:
// - favorites: array of movie objects
// - onRemoveFromFavorites: function to handle removing movies from favorites
export default function FavoriteMovies({ favorites, onRemoveFromFavorites }) {
    // Show empty state message if no favorites exist
    if (favorites.length === 0) {
        return (
            <div className="favorites-section">
                <h2 className="favorites-title">Favorite Movies</h2>
                <div className="favorites-empty">No favorite movies yet</div>
            </div>
        );
    }

    // Render grid of favorite movies if favorites exist
    return (
        <div className="favorites-section">
            <h2 className="favorites-title">Favorite Movies</h2>
            <div className="search-results">
                {/* Map through favorites array and render MovieCard for each movie */}
                {favorites.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onAddToFavorites={onRemoveFromFavorites} // Reusing add function for remove
                        isFavorite={true} // Flag to show remove button instead of add
                    />
                ))}
            </div>
        </div>
    );
} 