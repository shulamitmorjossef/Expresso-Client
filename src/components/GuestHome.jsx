import React, { useState, useEffect } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './styles/GuestHome.css';
import baseUrl from '../config';
import ProductModal from './ProductModal';
import ModalMessage from './ModalMessage';
import {
  User,
  List,
  Percent,
  LogOut,
  Star,
  LogIn
} from 'lucide-react';

export default function GuestHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = async (term) => {
    try {
      const res = await fetch(`${baseUrl}/search-products?query=${encodeURIComponent(term)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="outer-container">

      <div className="content-wrapper">

       <header className="admin-navbar">
          <nav>
            <ul className="nav-list">
                <li><Link to="/Login" 
                className="dropdown-link">
                <LogIn size={20} /> <span>Login</span>
                  </Link></li>
                <li><Link to="/Registration" className="dropdown-link">Register</Link></li>
                <li>
                <Link to="/ShowReviews" className="dropdown-link">
                  <Star size={20} /> <span>Reviews</span>
                </Link>

                </li>

            </ul>
          </nav>
        </header>
        <main className="main-content">
          <br />

          <div className="search-wrapper">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  if (value.trim()) {
                    handleSearch(value);
                  } else {
                    setSearchResults([]);
                  }
                }}
              />
              <FaSearch className="search-icon" onClick={() => handleSearch(searchTerm)} />
            </div>

            {searchResults.length > 0 && (
              <ul className="search-dropdown">
                {searchResults.map((item, idx) => (
                  <li key={idx}>
                    <div
                      className="search-item"
                      onClick={() => setSelectedProduct(item)}
                    >
                      <img 
                        src={`data:image/jpeg;base64,${item.image}`} 
                        alt={item.name} 
                        className="result-thumb" 
                      />
                      <div className="result-info">
                        <strong>{item.name}</strong>
                        <span className="result-meta">({item.type}) – ${item.price}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {searchTerm.trim() !== '' && searchResults.length === 0 && (
              <div className="no-results-message">No results found.</div>
            )}
          </div>

          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
           <CategoryCard src="/images/coffee.png" onClick={() => navigate('/CoffeeProducts')}label="Coffee Machines" />
            <CategoryCard src="/images/capsules.png" onClick={() => navigate('/Capsules')} label="Capsules" />
            <CategoryCard src="/images/milkfrothers.png" onClick={() => navigate('/MilkFrothers')} label="Milk frothers" />
          
          </div>
        </main>

        <footer className="footer">
          <Link to="/Terms" className="footer-link">Terms & Conditions</Link>
          <Link to="/About" className="footer-link" style={{ marginLeft: '20px' }}>About</Link>
        </footer>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            setModalData({
              title: 'Login Required',
              message: 'Guests cannot add to cart. Please log in first.',
              actionText: 'Go to Login',
              onAction: () => {
                setModalData(null);
                navigate('/Login');
              }
            });
            setSelectedProduct(null);
          }}
        />
      )}

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          onClose={modalData.onAction}
          onAction={modalData.onAction}
          actionText={modalData.actionText}
        />
      )}
    </div>
  );
}

// function CategoryCard({ src, label }) {
//   return (
//     <div
//       className="category-card"
//       onMouseEnter={e => {
//         e.currentTarget.style.transform = 'scale(1.05)';
//         e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
//       }}
//       onMouseLeave={e => {
//         e.currentTarget.style.transform = 'scale(1)';
//         e.currentTarget.style.boxShadow = 'none';
//       }}
//     >
//       <img src={src} alt={label} width="150" className="category-image" />
//       <p className="category-label">{label}</p>
//     </div>
//   );
// }
function CategoryCard({ src, label, onClick }) {
  return (
    // <div className="category-card">
      <div className="category-box" onClick={onClick}>
        <img src={src} alt={label} className="category-image" />
        <p className="category-label">{label}</p>
      </div>
    // </div>
  );
}