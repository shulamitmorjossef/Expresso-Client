import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles/GuestHome.css';

export default function GuestHome() {
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
                <li><Link to="/Login" className="dropdown-link">Login</Link></li>
                <li><Link to="/Registration" className="dropdown-link">Register</Link></li>
                <li>
                  <Link to="#" className="dropdown-link" onClick={(e) => {
                    e.preventDefault();
                    alert("Reviews page coming soon!");
                  }}>
                    Reviews
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </header>

        <main className="main">
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <FaSearch className="search-icon" />
          </div>

          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            <Link to="/CoffeeProducts" className="category-card-link">
              <CategoryCard src="/images/coffee.png" label="Coffee Machines" />
            </Link>

            <Link to="/capsules" className="category-card-link">
              <CategoryCard src="/images/capsules.png" label="Capsules" />
            </Link>

            <Link to="/milk-frothers" className="category-card-link">
              <CategoryCard src="/images/milkfrothers.png" label="Milk Frothers" />
            </Link>
          </div>
        </main>

        <footer className="footer">
          <Link to="/Terms" className="footer-link">Terms & Conditions</Link>
          <Link to="/About" className="footer-link" style={{ marginLeft: '20px' }}>About</Link>
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
