import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Sparkles } from 'lucide-react';
import { getTrendingBooks } from '../services/openLibraryApi';
import BookCarousel from '../components/BookCarousel';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      const books = await getTrendingBooks();
      setTrendingBooks(books);
      setLoading(false);
    };

    fetchTrending();
  }, []);

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Discover Your Next Great Read</span>
          </div>
          <h1 className="hero-title">
            Find Books That
            <span className="gradient-text"> Inspire You</span>
          </h1>
          <p className="hero-description">
            Explore millions of books from OpenLibrary. Search by title, author, or genre.
            Create your personal wishlist and never lose track of books you want to read.
          </p>
          <button className="cta-button" onClick={handleSearchClick}>
            <Search size={20} />
            Start Exploring
          </button>
        </div>
        <div className="hero-illustration">
          <div className="floating-book book-1">📚</div>
          <div className="floating-book book-2">📖</div>
          <div className="floating-book book-3">📕</div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending-section">
        <div className="section-header">
          <div className="section-title-wrapper">
            <TrendingUp className="section-icon" size={24} />
            <h2 className="section-title">Trending Now</h2>
          </div>
          <p className="section-subtitle">Popular books readers are discovering</p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading trending books...</p>
          </div>
        ) : (
          <BookCarousel books={trendingBooks} />
        )}
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Advanced Search</h3>
          <p>Search by title, author, genre, and more</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>Personal Wishlist</h3>
          <p>Save books to read later</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Smart Filters</h3>
          <p>Sort and filter results your way</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
