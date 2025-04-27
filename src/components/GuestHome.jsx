import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './GuestHome.css';

export default function GuestHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="outer-container">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content Container */}
      <div className="content-wrapper">
        {/* Header */}
        <header className="header">
          <button onClick={toggleMenu} className="menu-button">
            <FaBars color="white" />
          </button>

          {menuOpen && (
            <nav className="dropdown-menu">
              <ul>
                <li><a href="/Login" className="dropdown-link">Login</a></li>
                <li><a href="/register" className="dropdown-link">Register</a></li>
                <li><a href="/reviews" className="dropdown-link">Reviews</a></li>
              </ul>
            </nav>
          )}
        </header>

        {/* Main */}
        <main className="main">
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>

          {/* Categories */}
          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            <CategoryCard src="/images/coffee.png" label="Coffee Machines" />
            <CategoryCard src="/images/capsules.png" label="Capsules" />
            <CategoryCard src="/images/accessories.png" label="Accessories" />
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <a href="#" className="footer-link">Terms & Conditions</a>
          <Link to="/About" className="footer-link" style={{ marginLeft: '20px' }}>About</Link> {/* React Router */}
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
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img src={src} alt={label} width="150" className="category-image" />
      <p className="category-label">{label}</p>
    </div>
  );
}
