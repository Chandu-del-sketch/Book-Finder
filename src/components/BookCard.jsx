import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(book.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  return (
    <div className="book-card">
      <div className="book-cover-wrapper">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="book-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
          }}
        />
        <button
          className={`wishlist-toggle ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="book-info">
        <h3 className="book-title" title={book.title}>
          {book.title}
        </h3>
        <p className="book-author">{book.author}</p>
        {book.firstPublishYear && (
          <p className="book-year">{book.firstPublishYear}</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
