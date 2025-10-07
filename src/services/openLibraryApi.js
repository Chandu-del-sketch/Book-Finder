const BASE_URL = 'https://openlibrary.org';
const COVERS_URL = 'https://covers.openlibrary.org/b';

// Get book cover image URL
export const getCoverUrl = (coverId, size = 'M') => {
  if (!coverId) return '/placeholder-book.png';
  return `${COVERS_URL}/id/${coverId}-${size}.jpg`;
};

// Get trending/popular books (using subjects as a proxy)
export const getTrendingBooks = async () => {
  try {
    const subjects = ['fiction', 'science', 'history', 'fantasy', 'romance'];
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

    const response = await fetch(
      `${BASE_URL}/subjects/${randomSubject}.json?limit=20`
    );

    if (!response.ok) throw new Error('Failed to fetch trending books');

    const data = await response.json();

    return data.works.map(book => ({
      id: book.key,
      title: book.title,
      author: book.authors?.[0]?.name || 'Unknown Author',
      coverId: book.cover_id,
      coverUrl: getCoverUrl(book.cover_id),
      firstPublishYear: book.first_publish_year,
      subjects: book.subject?.slice(0, 3) || []
    }));
  } catch (error) {
    console.error('Error fetching trending books:', error);
    return [];
  }
};

// Search books by query
export const searchBooks = async (query, limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`
    );

    if (!response.ok) throw new Error('Failed to search books');

    const data = await response.json();

    return data.docs.map(book => ({
      id: book.key,
      title: book.title,
      author: book.author_name?.[0] || 'Unknown Author',
      coverId: book.cover_i,
      coverUrl: getCoverUrl(book.cover_i),
      firstPublishYear: book.first_publish_year,
      isbn: book.isbn?.[0],
      publisher: book.publisher?.[0],
      subjects: book.subject?.slice(0, 5) || [],
      authorKey: book.author_key?.[0]
    }));
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

// Search books by author
export const searchBooksByAuthor = async (author, limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?author=${encodeURIComponent(author)}&limit=${limit}`
    );

    if (!response.ok) throw new Error('Failed to search books by author');

    const data = await response.json();

    return data.docs.map(book => ({
      id: book.key,
      title: book.title,
      author: book.author_name?.[0] || 'Unknown Author',
      coverId: book.cover_i,
      coverUrl: getCoverUrl(book.cover_i),
      firstPublishYear: book.first_publish_year,
      subjects: book.subject?.slice(0, 5) || []
    }));
  } catch (error) {
    console.error('Error searching books by author:', error);
    return [];
  }
};

// Search books by subject/genre
export const searchBooksBySubject = async (subject, limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/subjects/${encodeURIComponent(subject.toLowerCase())}.json?limit=${limit}`
    );

    if (!response.ok) throw new Error('Failed to search books by subject');

    const data = await response.json();

    return data.works.map(book => ({
      id: book.key,
      title: book.title,
      author: book.authors?.[0]?.name || 'Unknown Author',
      coverId: book.cover_id,
      coverUrl: getCoverUrl(book.cover_id),
      firstPublishYear: book.first_publish_year,
      subjects: book.subject?.slice(0, 3) || []
    }));
  } catch (error) {
    console.error('Error searching books by subject:', error);
    return [];
  }
};

// Get popular subjects/genres
export const getPopularSubjects = () => [
  'Fiction',
  'Science',
  'History',
  'Fantasy',
  'Romance',
  'Mystery',
  'Thriller',
  'Biography',
  'Science Fiction',
  'Horror',
  'Poetry',
  'Self-Help',
  'Travel',
  'Art',
  'Philosophy'
];

// Sort books helper
export const sortBooks = (books, sortBy) => {
  const sorted = [...books];

  switch (sortBy) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'year-asc':
      return sorted.sort((a, b) => (a.firstPublishYear || 0) - (b.firstPublishYear || 0));
    case 'year-desc':
      return sorted.sort((a, b) => (b.firstPublishYear || 0) - (a.firstPublishYear || 0));
    case 'author-asc':
      return sorted.sort((a, b) => a.author.localeCompare(b.author));
    case 'author-desc':
      return sorted.sort((a, b) => b.author.localeCompare(a.author));
    default:
      return sorted;
  }
};
