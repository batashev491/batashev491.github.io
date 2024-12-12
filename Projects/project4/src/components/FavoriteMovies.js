'use client';
import MovieCard from './MovieCard';

export default function FavoriteMovies({ favorites, onRemoveFromFavorites }) {
    if (favorites.length === 0) {
        return (
            <div className="favorites-section">
                <h2 className="favorites-title">Favorite Movies</h2>
                <div className="favorites-empty">No favorite movies yet</div>
            </div>
        );
    }

    return (
        <div className="favorites-section">
            <h2 className="favorites-title">Favorite Movies</h2>
            <div className="search-results">
                {favorites.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onAddToFavorites={onRemoveFromFavorites}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    );
} 