import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import '../styles/CustomerHome.css';

export default function CustomerHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUnavailablePage = (e) => {
    e.preventDefault();
    alert("This page is not available yet. It will be available soon!");
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
                <li>
                <Link
                  to="/PersonalAreaAdmin"
                  className="dropdown-link">
                  Edit Account Details
                </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-link" onClick={handleUnavailablePage}>
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-link" onClick={handleUnavailablePage}>
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-link" onClick={handleUnavailablePage}>
                    Coupons
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-link" onClick={handleUnavailablePage}>
                    Reviews
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </header>

        <main className="main">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>

          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            <CategoryCard src="/images/coffee.png" label="Coffee Machines" />
            <CategoryCard src="/images/capsules.png" label="Capsules" />
            <CategoryCard src="/images/accessories.png" label="Accessories" />
          </div>
        </main>

        <footer className="footer">
          <Link to="/Terms" className="footer-link">Terms & Conditions</Link>
          <Link to="/About" className="footer-link"style={{ marginLeft: '20px' }}>About</Link>
        </footer>
      </div>
    </div>
  );
}

function CategoryCard({ src, label }) {
  return (
    <div
      className="category-card"
      onMouseEnter={e => {
        e.currentTarget.classList.add('hover');
      }}
      onMouseLeave={e => {
        e.currentTarget.classList.remove('hover');
      }}
    >
      <img src={src} alt={label} className="category-image" />
      <p className="category-label">{label}</p>
    </div>
  );
}
