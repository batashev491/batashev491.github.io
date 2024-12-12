export const getFavorites = () => {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('favoriteMovies');
  const parsed = favorites ? JSON.parse(favorites) : [];
  console.log('Getting favorites from storage:', parsed);
  return parsed;
};

export const saveFavorites = (favorites) => {
  if (typeof window === 'undefined') return;
  console.log('Saving favorites to storage:', favorites);
  localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
};

export const toggleFavorite = (favorites, movie) => {
  console.log('Current favorites:', favorites);
  console.log('Movie to toggle:', movie.id);
  
  const exists = favorites.some(fav => fav.id === movie.id);
  console.log('Movie exists in favorites:', exists);
  
  const result = exists 
    ? favorites.filter(fav => fav.id !== movie.id)
    : [...favorites, movie];
    
  console.log('Updated favorites:', result);
  return result;
}; 