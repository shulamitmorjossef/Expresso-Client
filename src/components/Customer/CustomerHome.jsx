import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CustomerHome.css';
import baseUrl from '../../config';
import ProductModal from '../ProductModal';

const detectProductType = (item) => {
  if (item.capacity && item.frothing_type) return 'milk_frothers';
  if (item.capacity) return 'coffee_machines';
  if (item.flavor) return 'capsules';
  return 'unknown';
};

export default function CustomerHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

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
      <div className="overlay"></div>
      <div className="content-wrapper">
        <header className="header">
          <button onClick={toggleMenu} className="menu-button">
            <FaBars color="white" />
          </button>
          {menuOpen && (
            <nav className="dropdown-menu">
              <ul>
                <li><Link to="/PersonalAreaCustomer" className="dropdown-link">Edit Account Details</Link></li>
                <li><Link to="#" className="dropdown-link">My Orders</Link></li>
                <li><Link to="/CartPage" className="dropdown-link">Shopping Cart</Link></li>
                <li><Link to="#" className="dropdown-link">Coupons</Link></li>
                <li><Link to="#" className="dropdown-link">Reviews</Link></li>
                <li><Link to="/" className="dropdown-link" onClick={handleLogout}>LogOut</Link></li>
              </ul>
            </nav>
          )}
        </header>

        <main className="main">
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
                {searchResults.map((item, idx) => {
                  const correctedType = detectProductType(item);
                  return (
                    <li key={idx}>
                      <div
                        className="search-item"
                        onClick={() => setSelectedProduct({ ...item, type: correctedType })}
                      >
                        <img src={item.image_path} alt={item.name} className="result-thumb" />
                        <div className="result-info">
                          <strong>{item.name}</strong>
                          <span className="result-meta">({correctedType}) – {item.price}₪</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {searchTerm.trim() !== '' && searchResults.length === 0 && (
              <div className="no-results-message">No results found.</div>
            )}
          </div>

          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            <Link to="/CoffeeProducts" className="category-card-link">
              <CategoryCard src="/images/coffee.png" label="Coffee Machines" />
            </Link>
            <Link to="/Capsules" className="category-card-link">
              <CategoryCard src="/images/capsules.png" label="Capsules" />
            </Link>
            <Link to="/MilkFrothers" className="category-card-link">
              <CategoryCard src="/images/milkfrothers.png" label="Milk Frothers" />
            </Link>
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
          onAddToCart={(product, quantity) => {
            const userId = parseInt(localStorage.getItem('userId'));
            const userType = localStorage.getItem('userType');

            if (!userType || userType === 'guest') {
              alert('You must register or log in to add items to cart.');
              localStorage.removeItem('userId');
              localStorage.removeItem('userType');
              navigate('/');
              return;
            }

            const rawType = product.type;
            fetch(`${baseUrl}/add-to-cart`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: userId,
                product_id: product.id,
                quantity,
                product_type: rawType
              })
            })
              .then(res => {
                if (!res.ok) throw new Error();
                alert(` Added ${quantity} x ${product.name} to your cart.`);
              })
              .catch(err => {
                console.error(' Error adding to cart:', err);
                alert('Something went wrong.');
              });

            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

function CategoryCard({ src, label }) {
  return (
    <div
      className="category-card"
      onMouseEnter={e => e.currentTarget.classList.add('hover')}
      onMouseLeave={e => e.currentTarget.classList.remove('hover')}
    >
      <img src={src} alt={label} className="category-image" />
      <p className="category-label">{label}</p>
    </div>
  );
}
