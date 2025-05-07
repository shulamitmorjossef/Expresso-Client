import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MilkFrothers.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';

export default function MilkFrothers() {
  const [frothers, setFrothers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-milk-frothers`)
      .then((res) => res.json())
      .then((data) => setFrothers(data))
      .catch((err) => console.error('Error fetching milk frothers:', err));
  }, []);

  const handleAddToCart = (item) => {
    const userType = localStorage.getItem('userType'); // 'guest' or 'customer'

    if (userType === 'guest' || !userType) {
      alert('You must register or log in to view the cart.');
      navigate('/');
    } else {
      alert(`Added ${item.name} to your cart.`);
      // כאן תוכל להוסיף את הלוגיקה להוספת המוצר לעגלה (למשל ב-Redux או ב-localStorage)
    }
  };

  return (
    <div className="milk-products-page">
      <h1>Milk Frothers</h1>
      <div className="milk-product-list">
        {frothers.map((item) => (
          <div className="milk-product-card" key={item.id}>
            <img src={item.image_path} alt={item.name} />
            <div className="milk-product-details">
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
