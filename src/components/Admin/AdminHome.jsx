import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

import '../styles/AdminHome.css';

export default function AdminHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = '/'; 
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
            <ul className="dropdown-list">
              <li>
                <Link
                  to="/PersonalAreaAdmin"
                  className="dropdown-link">
                  Edit Account Details
                </Link>
              </li>
              <ul className="dropdown-list">
              </ul>
              <li>
                <Link
                  to="#"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Orders page coming soon!");
                  }}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Catalog Products page coming soon!");
                  }}
                >
                  Catalog Products
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Delivery Days page coming soon!");
                  }}
                >
                  Delivery Days
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Statistics page coming soon!");
                  }}
                >
                  Statistics
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Coupons page coming soon!");
                  }}
                >
                  Coupons
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Reviews page coming soon!");
                  }}
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-link" onClick={handleLogout}>
                Edit terms & conditions
              </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-link" onClick={handleLogout}>
                LogOut
              </Link>
              </li>
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
