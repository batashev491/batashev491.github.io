'use client';

import { useState } from 'react';
import styles from './SearchBar.module.css';

// SearchBar component that accepts onSearch callback and optional placeholder text
const SearchBar = ({ onSearch, placeholder = 'Search movie' }) => {
  // State to manage the search input value
  const [searchTerm, setSearchTerm] = useState('');

  // Handle form submission and trigger the search
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (onSearch) {
      onSearch(searchTerm); // Call the parent component's search handler
    }
  };

  return (
    // Form wrapper with submit handler
    <form 
      onSubmit={handleSubmit}
      className={styles.searchForm}
    >
      <div className={styles.searchContainer}>
        {/* Search input field */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {/* Search icon SVG */}
        <div className={styles.searchIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className={styles.searchButton}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
