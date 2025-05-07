import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MilkFrothers.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';
import ProductModal from './ProductModal'; // ✅ ייבוא מודאל

export default function MilkFrothers() {
  const [frothers, setFrothers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ מוצר שנלחץ
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-milk-frothers`)
      .then((res) => res.json())
      .then((data) => setFrothers(data))
      .catch((err) => console.error('Error fetching milk frothers:', err));
  }, []);

  const handleAddToCart = (item, quantity = 1) => {
    const userType = localStorage.getItem('userType');

    if (userType === 'guest' || !userType) {
      alert('You must register or log in to view the cart.');
      navigate('/');
    } else {
      alert(`Added ${quantity} x ${item.name} to your cart.`);
      // כאן תוסיפי בהמשך שמירה לעגלה
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
            onClick={() => setSelectedProduct({ ...item, type: 'milk_frother' })} // ✅ פותח חלון
          >
            <img src={item.image_path} alt={item.name} />
            <div className="milk-product-details">
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation(); // ✅ שלא יפתח מודאל בנוסף לאזעקה
                  handleAddToCart(item);
                }}
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ החלונית */}
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
