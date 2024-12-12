'use client';

import Image from 'next/image';
import styles from './MovieDetails.module.css';

/**
 * MovieDetails component displays detailed information about a movie
 * @param {Object} props
 * @param {Object} props.movie - Movie data object from TMDB API
 * @param {Function} props.onAddToFavorites - Callback function to handle favorites
 * @param {boolean} props.isFavorite - Whether the current movie is in favorites
 */
const MovieDetails = ({ movie, onAddToFavorites, isFavorite }) => {
  if (!movie) return null;

  // Get first 6 cast members for the top cast section
  const topCast = movie.credits?.cast?.slice(0, 6) || [];

  return (
    <div className={styles.container}>
      {/* Full-width backdrop image section */}
      <div className={styles.backdrop}>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority
          className={styles.backdropImage}
        />
      </div>
      
      <div className={styles.content}>
        {/* Favorite toggle button */}
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
          onClick={() => onAddToFavorites(movie)}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        
        {/* Movie poster section */}
        <div className={styles.poster}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            priority
          />
        </div>
        
        {/* Movie information section */}
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          {/* Basic metadata display (year, runtime, rating) */}
          <div className={styles.metadata}>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{movie.runtime} minutes</span>
            <span>{movie.vote_average.toFixed(1)} ⭐</span>
          </div>
          
          {/* Movie overview/synopsis */}
          <div className={styles.overview}>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
          
          {/* Cast section - only shown if cast data exists */}
          {topCast.length > 0 && (
            <div className={styles.cast}>
              <h2>Top Cast</h2>
              <div className={styles.castGrid}>
                {topCast.map((actor) => (
                  <div key={actor.id} className={styles.castMember}>
                    {/* Actor profile image with fallback */}
                    <div className={styles.actorImage}>
                      <Image
                        src={actor.profile_path 
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : '/placeholder-actor.png'
                        }
                        alt={actor.name}
                        width={90}
                        height={135}
                      />
                    </div>
                    <div className={styles.actorInfo}>
                      <p className={styles.actorName}>{actor.name}</p>
                      <p className={styles.characterName}>{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Additional movie details section */}
          <div className={styles.details}>
            {/* Genre tags */}
            <div>
              <h3>Genres</h3>
              <div className={styles.genres}>
                {movie.genres?.map(genre => (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Production companies - only shown if data exists */}
            {movie.production_companies?.length > 0 && (
              <div>
                <h3>Production Companies</h3>
                <p>{movie.production_companies.map(company => company.name).join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;