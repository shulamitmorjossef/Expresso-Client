import React, { useState } from 'react';
import { FaSearch, FaBars, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CustomerHome.css';
import baseUrl from '../../config';
import ProductModal from '../ProductModal';
import ModalMessage from '../ModalMessage';
import {
  User,
  List,
  Percent,
  LogOut,
  Star
} from 'lucide-react';
// import { FaShoppingCart } from 'react-icons/fa';


export default function CustomerHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalInfo, setModalInfo] = useState(null);
  const navigate = useNavigate();
  // const [modalData, setModalData] = useState(null);
  

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

  const handleAddToCart = async (product, quantity) => {
    const userId = parseInt(localStorage.getItem('userId'));
    const userType = localStorage.getItem('userType');

    if (!userType || userType === 'guest') {
      setModalInfo({
        title: 'Login Required',
        message: 'You must register or log in to add items to cart.',
        actionText: 'Go to Login',
        onAction: () => {
          localStorage.removeItem('userId');
          localStorage.removeItem('userType');
          setModalInfo(null);
          navigate('/');
        }
      });
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/add-to-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.id,
          quantity,
          product_type: product.type
        })
      });

      if (!res.ok) throw new Error();

      setModalInfo({
        title: 'Added to Cart',
        message: `Added ${quantity} x ${product.name} to your cart.`,
        onAction: () => setModalInfo(null),
        actionText: 'OK'
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      setModalInfo({
        title: 'Error',
        message: 'Something went wrong.',
        onAction: () => setModalInfo(null),
        actionText: 'OK'
      });
    }
  };

  return (
    <div className="outer-container">

      <div className="content-wrapper">

        <header className="admin-navbar">
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/PersonalAreaCustomer">
                  <User size={20} /> <span>Edit Account Details</span>
                </Link>
              </li>

              <li>
                <Link to="/MyOrders">
                  <List size={20} /> <span>My Orders</span>
                </Link>
              </li>

              <li>
                <Link to="/CartPage">
                  <FaShoppingCart size={20} /> <span>Shopping Cart</span>
                </Link>
              </li>

              <li>
                <Link to="#"
                 className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalInfo({
                        title: "Coming Soon",
                        message: "Coupons page coming soon!",
                        actionText: "OK",
                        onAction: () => setModalInfo(null),
                      });
                    }}>
                  <Percent size={20} /> <span>Coupons</span>
                </Link>
              </li>

              <li>
                <Link to="#"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalInfo({
                        title: "Coming Soon",
                        message: "Reviews page coming soon!",
                        actionText: "OK",
                        onAction: () => setModalInfo(null),
                      });
                    }}>
                  <Star size={20} /> <span>Reviews</span>
                </Link>
              </li>

              <li>
                <Link to="/" onClick={handleLogout}>
                  <LogOut size={20} /> <span>LogOut</span>
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
            {/* <Link to="/CoffeeProducts" className="category-card-link">
              <CategoryCard src="/images/coffee.png" label="Coffee Machines" />
            </Link>
            <Link to="/Capsules" className="category-card-link">
              <CategoryCard src="/images/capsules.png" label="Capsules" />
            </Link>
            <Link to="/MilkFrothers" className="category-card-link">
              <CategoryCard src="/images/milkfrothers.png" label="Milk Frothers" />
            </Link> */}
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
          onAddToCart={(product, quantity) => {
            handleAddToCart(product, quantity);
            setSelectedProduct(null);
          }}
        />
      )}

      {modalInfo && (
        <ModalMessage
          title={modalInfo.title}
          message={modalInfo.message}
          onClose={modalInfo.onAction}
          onAction={modalInfo.onAction}
          actionText={modalInfo.actionText}
        />
      )}
      <button className="cart-button" onClick={() => navigate('/CartPage')}>
      <FaShoppingCart className="cart-icon" />
    </button>
    </div>
  );
}

// function CategoryCard({ src, label }) {
//   return (
//     <div
//       className="category-card"
//       onMouseEnter={e => e.currentTarget.classList.add('hover')}
//       onMouseLeave={e => e.currentTarget.classList.remove('hover')}
//     >
//       <img src={src} alt={label} className="category-image" />
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