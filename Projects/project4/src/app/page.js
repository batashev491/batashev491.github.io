'use client';
import SearchBar from "@/components/SearchBar";
import FavoriteMovies from "@/components/FavoriteMovies";
import '@/styles/main.css';

export default function Home() {
  return (
    <div className="container">
      <main className="main-content">
        <SearchBar onSearch={(query) => {
          console.log('Searching for:', query);
        }} />
        <FavoriteMovies />
      </main>
    </div>
  );
}
