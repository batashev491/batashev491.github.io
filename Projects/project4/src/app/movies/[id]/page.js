import MovieContainer from '@/components/MovieContainer';
import { getMovie, getMovieCredits } from '@/lib/api';

export default async function MoviePage({ params }) {
  const [movieData, creditsData] = await Promise.all([
    getMovie(params.id),
    getMovieCredits(params.id)
  ]);

  const movie = {
    ...movieData,
    credits: creditsData
  };

  return <MovieContainer movie={movie} />;
}