import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Navbar from './components/Navbar';

function App() {
  return (
    <WishlistProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;
