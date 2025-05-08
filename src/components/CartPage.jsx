import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './CartPage.css';
import baseUrl from '../config';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`${baseUrl}/get-cart/${userId}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => item.name && item.price);
        setCartItems(filtered);
        calculateSubtotal(filtered);
      })
      .catch(err => console.error("Error loading cart:", err));
  }, []);

  const calculateSubtotal = (items) => {
    let total = 0;
    for (const item of items) {
      total += parseFloat(item.price || 0) * item.quantity;
    }
    setSubtotal(total.toFixed(2));
  };

  const updateQuantity = async (productId, productType, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await fetch(`${baseUrl}/update-cart-quantity`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          product_type: productType,
          quantity: newQuantity
        })
      });

      const updated = cartItems.map(item =>
        item.product_id === productId && item.product_type === productType
          ? { ...item, quantity: newQuantity }
          : item
      );

      setCartItems(updated);
      calculateSubtotal(updated);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleDelete = (productId, productType) => {
    fetch(`${baseUrl}/remove-from-cart`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId, product_type: productType })
    })
      .then(res => res.json())
      .then(() => {
        const updated = cartItems.filter(item => !(item.product_id === productId && item.product_type === productType));
        setCartItems(updated);
        calculateSubtotal(updated);
      })
      .catch(err => console.error('Error removing item:', err));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.product_id} className="cart-item">
          <img src={item.image_path} alt={item.name} className="cart-image" />
          <div className="cart-details">
            <h4>{item.name}</h4>
            <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.product_id, item.product_type, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product_id, item.product_type, item.quantity + 1)}>+</button>
            </div>
            <p><strong>Total: ${(item.quantity * parseFloat(item.price)).toFixed(2)}</strong></p>
          </div>
          <button className="delete-btn" onClick={() => handleDelete(item.product_id, item.product_type)}>🗑️</button>
        </div>
      ))}
      <hr />
      <div className="subtotal">
        <span>Subtotal:</span>
        <strong>${subtotal}</strong>
      </div>
      <input className="coupon-input" placeholder="Enter coupon code" />
      <button className="apply-btn">Apply</button>

      <div className="terms">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <label htmlFor="agree">I agree to the terms and conditions</label>
      </div>

      {agreed ? (
        <Link to="/DeliveryForm" className="continue-btn">Continue</Link>
      ) : (
        <button
          className="continue-btn"
          onClick={() => alert('You must agree to the terms and conditions before continuing.')}
        >
          Continue
        </button>
      )}
    </div>
  );
}
