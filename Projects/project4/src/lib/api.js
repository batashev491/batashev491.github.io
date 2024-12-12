// API configuration constants
const API_KEY = '49e182a21e8748c2508e9af8af729c50';
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetches a paginated list of popular movies from TMDB API
 * @param {number} [page=1] - The page number for pagination
 * @returns {Promise<Object>} Movie data including results and pagination info
 * @throws {Error} If the API request fails
 */
export async function getMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
}

/**
 * Searches for movies based on a query string
 * @param {string} query - The search term
 * @param {number} [page=1] - The page number for pagination
 * @returns {Promise<Object>} Search results and pagination info
 * @throws {Error} If the search request fails
 */
export async function searchMovies(query, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies');
  }
}

/**
 * Fetches detailed information for a specific movie
 * @param {number|string} id - The TMDB movie ID
 * @returns {Promise<Object>} Detailed movie information
 * @throws {Error} If the movie is not found or the request fails
 */
export async function getMovie(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Movie not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw new Error(error.message || 'Failed to fetch movie');
  }
}

/**
 * Fetches cast and crew information for a specific movie
 * @param {number|string} id - The TMDB movie ID
 * @returns {Promise<Object>} Movie credits including cast and crew data
 * @throws {Error} If the credits request fails
 */
export async function getMovieCredits(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw new Error('Failed to fetch movie credits');
  }
} 