import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';

export default function CustomerHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={outerContainerStyle}>
      {/* Overlay */}
      <div style={overlayStyle}></div>

      {/* Content Container */}
      <div style={contentWrapperStyle}>
        {/* Header */}
        <header style={headerStyle}>
          <button onClick={toggleMenu} style={menuButtonStyle}>
            <FaBars color="white" />
          </button>

          {menuOpen && (
            <nav style={dropdownMenuStyle}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li><a href="/edit-account" style={dropdownLinkStyle}>Edit Account Details</a></li>
                <li><a href="/orders" style={dropdownLinkStyle}>My Orders</a></li>
                <li><a href="/cart" style={dropdownLinkStyle}>Shopping Cart</a></li>
                <li><a href="/coupons" style={dropdownLinkStyle}>Coupons</a></li>
                <li><a href="/reviews" style={dropdownLinkStyle}>Reviews</a></li>
              </ul>
            </nav>
          )}
        </header>

        {/* Main */}
        <main style={mainStyle}>
          {/* Search Bar */}
          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Search..."
              style={searchInputStyle}
            />
            <FaSearch style={searchIconStyle} />
          </div>

          {/* Categories */}
          <h2 style={categoriesTitleStyle}>Categories</h2>
          <div style={categoriesContainerStyle}>
            <CategoryCard src="/images/coffee.png" label="Coffee Machines" />
            <CategoryCard src="/images/capsules.png" label="Capsules" />
            <CategoryCard src="/images/accessories.png" label="Accessories" />
          </div>
        </main>

        {/* Footer */}
        <footer style={footerStyle}>
          <a href="#" style={footerLinkStyle}>Terms & Conditions</a>
          <a href="#" style={{...footerLinkStyle, marginLeft: '20px'}}>About</a> {/* כפתור אודות */}
        </footer>
      </div>
    </div>
  );
}

function CategoryCard({ src, label }) {
  return (
    <div style={categoryCardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img src={src} alt={label} width="150" style={{ borderRadius: '10px' }} />
      <p style={{ marginTop: '10px', fontWeight: 'bold', color: 'white' }}>{label}</p>
    </div>
  );
}

// Styles
const outerContainerStyle = {
  position: 'relative',
  fontFamily: 'Poppins, Arial, sans-serif',
  minHeight: '100vh',
  backgroundImage: 'url("/images/coffee_background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  overflow: 'hidden',
  width: '100%',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 0,
};

const contentWrapperStyle = {
  position: 'relative',
  zIndex: 2,
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '30px',
};

const menuButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '80px',
  right: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  borderRadius: '8px',
  overflow: 'hidden',
  zIndex: 5,
};

const dropdownLinkStyle = {
  display: 'block',
  padding: '15px 30px',
  textDecoration: 'none',
  color: 'white',
  fontSize: '16px',
};

const mainStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '40px 20px',
};

const searchContainerStyle = {
  position: 'relative',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto 40px',
};

const searchInputStyle = {
  width: '100%',
  padding: '10px 40px 10px 15px',
  borderRadius: '25px',
  border: '1px solid #ccc',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};

const searchIconStyle = {
  position: 'absolute',
  right: '15px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#888',
};

const categoriesTitleStyle = {
  color: 'white',
  fontSize: '32px',
  marginBottom: '30px',
};

const categoriesContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '40px',
};

const categoryCardStyle = {
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
};

const footerStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '20px',
  marginTop: '40px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '10px',
};

const footerLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontSize: '14px',
};
