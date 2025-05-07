// CartPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');

    if (!userType || userType === 'guest') {
      alert('⚠️ You must register or log in to view the cart.');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {/* ...cart contents here... */}
    </div>
  );
}
