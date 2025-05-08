import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MilkFrothers.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';
import ProductModal from './ProductModal';

export default function MilkFrothers() {
  const [frothers, setFrothers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-milk-frothers`)
      .then((res) => res.json())
      .then((data) => setFrothers(data))
      .catch((err) => console.error('Error fetching milk frothers:', err));
  }, []);

  const handleAddToCart = async (item, quantity = 1) => {
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');

    if (userType === 'guest' || !userType) {
      alert('You must register or log in to view the cart.');
      navigate('/');
      return;
    }

    const productType = item.type || 'milk_frothers'; // ✅ מבטיח שהטייפ נשלח תמיד

    try {
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
    <div className="milk-products-page">
      <h1>Milk Frothers</h1>
      <div className="milk-product-list">
        {frothers.map((item) => (
          <div
            className="milk-product-card"
            key={item.id}
            onClick={() => setSelectedProduct({ ...item, type: 'milk_frothers' })}
          >
            <img src={item.image_path} alt={item.name} />
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
            handleAddToCart({ ...product, type: 'milk_frothers' }, quantity);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
