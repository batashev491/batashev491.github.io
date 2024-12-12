import MovieContainer from '@/components/MovieContainer';
import { getMovie, getMovieCredits } from '@/lib/api';

// Dynamic route page component for individual movie details
export default async function MoviePage({ params }) {
  // Fetch movie details and credits in parallel for better performance
  const [movieData, creditsData] = await Promise.all([
    getMovie(params.id),
    getMovieCredits(params.id)
  ]);

  // Combine movie data with credits into a single object
  const movie = {
    ...movieData,
    credits: creditsData
  };

  // Render the MovieContainer component with the combined movie data
  return <MovieContainer movie={movie} />;
}