import { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';
import {
  searchBooks,
  searchBooksByAuthor,
  searchBooksBySubject,
  getPopularSubjects,
  sortBooks
} from '../services/openLibraryApi';
import BookCard from '../components/BookCard';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const genres = getPopularSubjects();

  const handleSearch = async (e) => {
    e?.preventDefault();

    if (!searchQuery.trim() && !genre) return;

    setLoading(true);

    try {
      let results = [];

      if (genre && !searchQuery) {
        results = await searchBooksBySubject(genre);
      } else if (searchType === 'author') {
        results = await searchBooksByAuthor(searchQuery);
      } else {
        results = await searchBooks(searchQuery);
      }

      // Filter by genre if both query and genre are present
      if (genre && searchQuery) {
        results = results.filter(book =>
          book.subjects.some(subject =>
            subject.toLowerCase().includes(genre.toLowerCase())
          )
        );
      }

      // Apply sorting
      if (sortBy !== 'relevance') {
        results = sortBooks(results, sortBy);
      }

      setBooks(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery || genre) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchQuery, searchType, genre, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSearchType('title');
    setGenre('');
    setSortBy('relevance');
    setBooks([]);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        {/* Search Header */}
        <div className="search-header">
          <h1>Search Books</h1>
          <p>Discover books by title, author, or genre</p>
        </div>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder={`Search by ${searchType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="search-type-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>

          <button
            type="button"
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
          </button>
        </form>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>
                <SlidersHorizontal size={16} />
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="filter-select"
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>
                <SlidersHorizontal size={16} />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="relevance">Relevance</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="year-desc">Year (Newest)</option>
                <option value="year-asc">Year (Oldest)</option>
                <option value="author-asc">Author (A-Z)</option>
                <option value="author-desc">Author (Z-A)</option>
              </select>
            </div>

            <button className="clear-filters" onClick={handleClearFilters}>
              Clear All
            </button>
          </div>
        )}

        {/* Results */}
        <div className="search-results">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Searching books...</p>
            </div>
          ) : books.length > 0 ? (
            <>
              <div className="results-header">
                <p>{books.length} books found</p>
              </div>
              <div className="books-grid">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </>
          ) : searchQuery || genre ? (
            <div className="no-results">
              <SearchIcon size={48} />
              <h3>No books found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="empty-state">
              <SearchIcon size={64} />
              <h3>Start Searching</h3>
              <p>Enter a book title, author name, or select a genre to begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
