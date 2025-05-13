
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MilkFrothers.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';
import ProductModal from './ProductModal';
import ModalMessage from '../components/ModalMessage';

export default function MilkFrothers() {
  const [frothers, setFrothers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-milk-frothers`)
      .then(res => res.json())
      .then(data => setFrothers(data))
      .catch(err => console.error('Error fetching milk frothers:', err));
  }, []);

  const handleAddToCart = async (item, quantity = 1) => {
    if (item.sum_of === 0) {
      setModalData({
        title: 'Out of Stock',
        message: 'Sorry, this product is out of stock.',
        onClose: () => setModalData(null)
      });
      return;
    }

    const userType = localStorage.getItem('userType');
    const userId = parseInt(localStorage.getItem('userId'));

    if (userType === 'guest' || !userType) {
      setModalData({
        title: 'Login Required',
        message: 'You must register or log in to view the cart.',
        onClose: () => {
          setModalData(null);
          navigate('/');
        },
        actionText: 'Go to Login'
      });
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/add-to-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: item.id,
          quantity,
          product_type: item.type || 'milk_frothers'
        })
      });

      if (!res.ok) throw new Error('Server error');

      setModalData({
        title: 'Added to Cart',
        message: `Added ${quantity} x ${item.name} to your cart.`,
        onClose: () => setModalData(null)
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      setModalData({
        title: 'Oops',
        message: 'The product is not available in the quantity you wish to add.',
        onClose: () => setModalData(null)
      });
    }
  };

  const handleSort = async (type) => {
    if (type === 'asc') {
      const sorted = [...frothers].sort((a, b) => a.price - b.price);
      setFrothers(sorted);
    } else if (type === 'desc') {
      const sorted = [...frothers].sort((a, b) => b.price - a.price);
      setFrothers(sorted);
    } else if (type === 'popularity') {
      try {
        const res = await fetch(`${baseUrl}/milk-frothers-by-popularity`);
        if (!res.ok) throw new Error('Failed to fetch by popularity');
        const data = await res.json();
        setFrothers(data);
      } catch (err) {
        console.error('Error sorting by popularity:', err);
      }
    }
  };

  return (
    <div className="milk-products-page">
      <h1 className="Milk-frothers-title">Milk Frothers</h1>

      <div className="sort-controls">
        <button className="sort-button" onClick={() => handleSort('asc')}>
          Price: Low to High
        </button>
        <button className="sort-button" onClick={() => handleSort('desc')}>
          Price: High to Low
        </button>
        <button className="sort-button" onClick={() => handleSort('popularity')}>
          Sort by Popularity
        </button>
      </div>

      <div className="milk-product-list">
        {frothers.map(item => (
          <div
            className="milk-product-card"
            key={item.id}
            onClick={() => setSelectedProduct({ ...item, type: 'milk_frothers' })}
            style={{ position: 'relative' }}
          >
            {item.sum_of === 0 && <div className="stock-badge">Out of Stock</div>}
            {item.sum_of === 1 && <div className="stock-badge">Last item in stock</div>}

            <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
            <div className="milk-product-details">
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart({ ...item, type: 'milk_frothers' });
                }}
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
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

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          onClose={modalData.onClose}
          onAction={modalData.onAction || modalData.onClose}
          actionText={modalData.actionText}
        />
      )}
      <button className="back-button" onClick={() => navigate(-1)}>
      Back
     </button>
     <button className="cart-button" onClick={() => navigate('/CartPage')}>
      <FaShoppingCart className="cart-icon" />
    </button>
    </div>
  );
}
