import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Capsules.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-capsule`)
      .then((res) => res.json())
      .then((data) => setCapsules(data))
      .catch((err) => console.error('Error fetching capsules:', err));
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
    <div className="capsules-page">
      <h1>Capsules</h1>
      <div className="capsule-list">
        {capsules.map((item) => (
          <div className="capsule-card" key={item.id}>
            <img src={item.image_path} alt={item.name} />
            <div className="capsule-details">
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
