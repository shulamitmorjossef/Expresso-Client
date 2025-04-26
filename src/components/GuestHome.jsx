import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';

export default function GuestHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={containerStyle}>
      
      {/* Header */}
      <header style={headerStyle}>
        <button onClick={toggleMenu} style={menuButtonStyle}>
          <FaBars />
        </button>

        {menuOpen && (
          <nav style={dropdownMenuStyle}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><button style={dropdownItemStyle}>Login</button></li>
              <li><button style={dropdownItemStyle}>Register</button></li>
              <li><button style={dropdownItemStyle}>Reviews</button></li>
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
        <a href="#" style={{ textDecoration: 'none', color: '#5c4033' }}>Terms & Conditions</a>
      </footer>
    </div>
  );
}

function CategoryCard({ src, label }) {
  return (
    <div style={categoryCardStyle}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <img src={src} alt={label} width="150" style={{ borderRadius: '10px' }} />
      <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#4b2e2e' }}>{label}</p>
    </div>
  );
}

// Styles
const containerStyle = {
  fontFamily: 'Poppins, Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  backgroundImage: 'url("/images/coffee_background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  overflow: 'hidden',
  height: '100vh', // וודא שהדף ממלא את כל הגובה של החלון
  width: '100%', // וודא שהדף ממלא את כל הרוחב של החלון
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',  // משנה את המיקום של הכפתור ימינה
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // חצי שקוף
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  position: 'relative',
  zIndex: 100,
  width: '100%',
};

const menuButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '70px',
  right: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  zIndex: 10,
};

const dropdownItemStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: '15px 30px',
  width: '100%',
  textAlign: 'left',
  fontSize: '16px',
  cursor: 'pointer',
  color: '#333',
};

const searchContainerStyle = {
  position: 'relative',
  display: 'inline-block',
  marginBottom: '50px',
  textAlign: 'center', // ממרכז את האלמנט
};

const searchInputStyle = {
  padding: '10px 40px 10px 15px',
  width: '300px',
  borderRadius: '25px',
  border: '1px solid #ccc',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const searchIconStyle = {
  position: 'absolute',
  right: '15px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#888',
};

const categoriesTitleStyle = {
  marginBottom: '20px',
  color: '#5c4033',
  fontSize: '28px',
  fontWeight: 'bold',
};

const categoriesContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  flexWrap: 'wrap',
};

const categoryCardStyle = {
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
};

const footerStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
  position: 'relative',
  zIndex: 100,
};

const mainStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '40px',
  width: '100%',
};

const bodyStyle = {
  height: '100%', // וודא שהגוף ממלא את כל הגובה
  margin: 0,      // לא להשאיר רווחים
  padding: 0,     // לא להשאיר רווחים
};

const htmlStyle = {
  height: '100%', // וודא שה-HTML ממלא את כל הגובה
  margin: 0,      // לא להשאיר רווחים
  padding: 0,     // לא להשאיר רווחים
};
