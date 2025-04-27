import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './CustomerHome.css';

export default function CustomerHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
                <li><a href="/edit-account" className="dropdown-link">Edit Account Details</a></li>
                <li><a href="/orders" className="dropdown-link">My Orders</a></li>
                <li><a href="/cart" className="dropdown-link">Shopping Cart</a></li>
                <li><a href="/coupons" className="dropdown-link">Coupons</a></li>
                <li><a href="/reviews" className="dropdown-link">Reviews</a></li>
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
          <a href="#" className="footer-link">Terms & Conditions</a>
          <Link to="/About" className="footer-link about-link">About</Link> {/* Link */}
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
