import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MovieCard({ movie, onAddToFavorites, isFavorite }) {
    const router = useRouter();
    
    if (!movie.poster_path) return null;

    const truncatedOverview = movie.overview
        ? movie.overview.slice(0, 150) + (movie.overview.length > 150 ? '...' : '')
        : 'No description available';

    const handleCardClick = (e) => {
        if (e.target.closest('.favorite-button')) return;
        router.push(`/movies/${movie.id}`);
    };

    return (
        <div 
            className="movie-card" 
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
        >
            <div className="movie-poster-wrapper">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={100}
                    height={150}
                    className="movie-poster"
                />
            </div>
            <div className="movie-info">
                <button
                    className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
                    onClick={() => onAddToFavorites(movie)}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                </button>
                <h3 className="movie-title" title={movie.title}>
                    {movie.title}
                </h3>
                <p className="movie-year">
                    {movie.release_date?.split('-')[0] || 'N/A'}
                </p>
                <div className="movie-rating">
                    ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                </div>
                <p className="movie-overview" title={movie.overview}>
                    {truncatedOverview}
                </p>
            </div>
        </div>
    );
} 