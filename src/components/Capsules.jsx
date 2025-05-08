import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Capsules.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';
import ProductModal from './ProductModal';

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-capsule`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch capsules');
        return res.json();
      })
      .then((data) => setCapsules(data))
      .catch((err) => console.error('Error fetching capsules:', err));
  }, []);

  const handleAddToCart = async (item, quantity = 1) => {
    const userType = localStorage.getItem('userType');
    const userId = parseInt(localStorage.getItem('userId'));

    if (userType === 'guest' || !userType) {
      alert('You must register or log in to view the cart.');
      navigate('/');
      return;
    }

    const productType = item.type || 'capsules';

    try {
      console.log("📦 Sending to server:", {
        user_id: userId,
        product_id: item.id,
        quantity,
        product_type: productType
      });

      const res = await fetch(`${baseUrl}/add-to-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: item.id,
          quantity,
          product_type: productType
        }),
      });

      if (!res.ok) throw new Error('Server error');

      alert(`✅ Added ${quantity} x ${item.name} to your cart.`);
    } catch (err) {
      console.error('❌ Error adding to cart:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="capsules-page">
      <h1>Capsules</h1>
      <div className="capsule-list">
        {capsules.map((item) => (
          <div
            className="capsule-card"
            key={item.id}
            onClick={() => setSelectedProduct({ ...item, type: 'capsules' })}
          >
            <img src={item.image_path} alt={item.name} />
            <div className="capsule-details">
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart({ ...item, type: 'capsules' });
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
    </div>
  );
}
