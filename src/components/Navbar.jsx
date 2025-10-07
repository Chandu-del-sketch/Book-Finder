import { Link, useLocation } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <BookOpen size={28} />
          <span>BookFinder</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`navbar-link ${location.pathname === '/search' ? 'active' : ''}`}
          >
            Search
          </Link>
          <button className="wishlist-btn">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="wishlist-badge">{wishlistCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
