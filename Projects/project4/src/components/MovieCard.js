import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-poster.png';

  return (
    <div className={styles.card}>
      <Link href={`/movie/${movie.id}`}>
        <div className={styles.imageContainer}>
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.year}>
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </Link>
      <div className={styles.favoriteButton}>
        <FavoriteButton movieId={movie.id} />
      </div>
    </div>
  );
} 