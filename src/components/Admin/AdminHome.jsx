import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  User,
  List,
  Package,
  Truck,
  BarChart,
  Percent,
  FileText,
  LogOut,
  Coffee,
  Pill,
  Droplet,
  Star,
  Users
} from 'lucide-react';
import '../styles/AdminHome.css';

export default function AdminHome() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="outer-container">
      <div className="overlay"></div>

      <div className="content-wrapper">
        {/* Top Navbar */}
        <header className="admin-navbar">
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/PersonalAreaAdmin">
                  <User size={20} /> <span>Edit Account</span>
                </Link>
              </li>

              <li>
                <Link to="/OrderAdminPage">
                  <List size={20} /> <span>Orders</span>
                </Link>
              </li>

              {/* Catalog Dropdown */}
              <li
                className="dropdown-parent"
                onMouseEnter={() => setCatalogOpen(true)}
                onMouseLeave={() => setCatalogOpen(false)}
              >
                <span className="dropdown-trigger">
                  <Package size={20} /> <span>Catalog</span>
                </span>
                {catalogOpen && (
                  <ul className="dropdown-submenu">
                    <li>
                      <Link to="/CoffeeCatalog">
                        <Coffee size={16} /> <span>Coffee Machines</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/CapsuleCatalog">
                        <Pill size={16} /> <span>Capsules</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/FrotherCatalog">
                        <Droplet size={16} /> <span>Milk Frothers</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Statistics Dropdown */}
              <li
                className="dropdown-parent"
                onMouseEnter={() => setStatsOpen(true)}
                onMouseLeave={() => setStatsOpen(false)}
              >
                <span className="dropdown-trigger">
                  <BarChart size={20} /> <span>Statistics</span>
                </span>
                {statsOpen && (
                  <ul className="dropdown-submenu">
                    <li>
                      <Link to="/TotalSold">
                        <BarChart size={16} /> <span>Total Sold</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/BestSellers">
                        <Star size={16} /> <span>Best Sellers</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/CustomerCount">
                        <Users size={16} /> <span>Customer Count</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link to="/DeliveryDays">
                  <Truck size={20} /> <span>Delivery</span>
                </Link>
              </li>

              <li>
                <Link to="/CouponsPage">
                  <Percent size={20} /> <span>Coupons</span>
                </Link>
              </li>

              <li>
                <Link to="/EditTerms">
                  <FileText size={20} /> <span>Terms</span>
                </Link>
              </li>

              <li>
                <Link to="/" onClick={handleLogout}>
                  <LogOut size={20} /> <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {/* Search */}
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <FaSearch className="search-icon" />
          </div>

          {/* Categories */}
          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            <CategoryCard src="/images/coffee.png" label="Coffee Machines" />
            <CategoryCard src="/images/capsules.png" label="Capsules" />
            <CategoryCard src="/images/milkfrothers.png" label="Accessories" />
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
    <div className="category-card">
      <div className="category-box">
        <img src={src} alt={label} className="category-image" />
        <p className="category-label">{label}</p>
      </div>
    </div>
  );
}
