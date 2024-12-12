// Retrieves favorite movies from localStorage
// Returns empty array if running on server or if no favorites exist
export const getFavorites = () => {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('favoriteMovies');
  const parsed = favorites ? JSON.parse(favorites) : [];
  console.log('Getting favorites from storage:', parsed);
  return parsed;
};

// Saves the favorites array to localStorage
// Skips operation if running on server
export const saveFavorites = (favorites) => {
  if (typeof window === 'undefined') return;
  console.log('Saving favorites to storage:', favorites);
  localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
};

// Toggles a movie in the favorites array
// If movie exists - removes it, if doesn't exist - adds it
// @param {Array} favorites - Current favorites array
// @param {Object} movie - Movie object to toggle
// @returns {Array} Updated favorites array
export const toggleFavorite = (favorites, movie) => {
  console.log('Current favorites:', favorites);
  console.log('Movie to toggle:', movie.id);
  
  // Check if movie already exists in favorites
  const exists = favorites.some(fav => fav.id === movie.id);
  console.log('Movie exists in favorites:', exists);
  
  // If movie exists, filter it out
  // If movie doesn't exist, add it to array
  const result = exists 
    ? favorites.filter(fav => fav.id !== movie.id)
    : [...favorites, movie];
    
  console.log('Updated favorites:', result);
  return result;
}; 