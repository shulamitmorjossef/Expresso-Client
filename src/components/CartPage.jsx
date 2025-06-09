import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import baseUrl from '../config';
import ModalMessage from '../components/ModalMessage';
import { Trash2 } from 'lucide-react';
import { use } from 'react';

export default function CartPage() {
  const [modalData, setModalData] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [originalSubtotal, setOriginalSubtotal] = useState(0); 
  const [couponCode, setCouponCode] = useState(""); 
  const [couponApplied, setCouponApplied] = useState(false); 
  const [agreed, setAgreed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem('userId'));
  const userName = localStorage.getItem('username');


  useEffect(() => {
    if (!userId || isNaN(userId)) {
      console.error('Invalid user ID – user not logged in.');
      return;
    }

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
    const fixed = total.toFixed(2);
    setSubtotal(fixed);
    setOriginalSubtotal(fixed);
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

  const handleApplyCoupon = async () => {
  if (!couponCode) return;

  try {
    const res = await fetch(`${baseUrl}/get-coupon/${couponCode}`);
    if (!res.ok) throw new Error("Coupon not found");

    const coupon = await res.json();

    if (coupon.user_id) {
      console.log('userId:', userId, 'coupon.user_id:', coupon.user_id);
      if (parseInt(coupon.user_id) !== parseInt(userId)) {

        throw new Error("This coupon is not for you (;");
      }

      const userRes = await fetch(`${baseUrl}/get-user-details/${userName}`);
      if (!userRes.ok) throw new Error("User not found");


      const user = await userRes.json();
      const birthDate = new Date(user.user.birthday); 
      const today = new Date();
      console.log('today:', today, 'birthDate:', birthDate);
      if (
        birthDate.getDate() !== today.getDate() ||
        birthDate.getMonth() !== today.getMonth()
      ) {
        throw new Error("This coupon is only valid on your birthday");
      }
    }

    if (coupon.discount_percent) {
      const discount = (parseFloat(originalSubtotal) * (coupon.discount_percent / 100)).toFixed(2);
      const newTotal = (parseFloat(originalSubtotal) - parseFloat(discount)).toFixed(2);
      setSubtotal(newTotal);
      setCouponApplied(true);
      setModalData({
        title: 'Coupon Applied',
        message: `You got ${coupon.discount_percent}% off! New total: $${newTotal}`,
        actionText: 'Awesome!',
        onAction: () => setModalData(null),
      });
    }
  } catch (err) {
    console.error('Coupon error:', err);
    setModalData({
      title: 'Invalid Coupon',
      message: err.message || 'The coupon code you entered is not valid.',
      actionText: 'OK',
      onAction: () => setModalData(null),
    });
  }
  };


  const handleContinue = () => {
    if (!agreed || cartItems.length === 0) {
      setShowWarning(true);
      return;
    }
    navigate('/DeliveryForm');
  };

  const handleRemoveCoupon = () => {
  setSubtotal(originalSubtotal);
  setCouponApplied(false);
  setCouponCode("");
};

  return (
    <div className="page-with-background">
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.map(item => (
          <div key={item.product_id} className="cart-item">
            <img 
              src={`data:image/jpeg;base64,${item.image}`}
              alt={item.name} className="cart-image" />
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.product_id, item.product_type, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => {
                  if (item.quantity < item.sum_of) {
                    updateQuantity(item.product_id, item.product_type, item.quantity + 1);
                  } else {
                    setModalData({
                      title: 'Stock Limit',
                      message: 'You have reached the maximum available stock.',
                      actionText: 'OK',
                      onAction: () => setModalData(null),
                    });
                  }
                }}>+</button>
              </div>
              <p><strong>Total: ${(item.quantity * parseFloat(item.price)).toFixed(2)}</strong></p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item.product_id, item.product_type)}>
              <Trash2 size={22} color="#6f4e37" />
            </button>
          </div>
        ))}

        <hr />
        <div className="subtotal">
          <span>Subtotal:</span>
          <strong>${subtotal}</strong>
        </div>

        <div className="coupon-area">
        <input
          className="coupon-input"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={couponApplied}
        />
        {!couponApplied ? (
          <button className="apply-btn" onClick={handleApplyCoupon}>
            Apply
          </button>
        ) : (
          <button className="remove-coupon-btn" onClick={handleRemoveCoupon}>
            Remove Coupon
          </button>
        )}
      </div>
      <div className="terms-and-continue">
  <div className="terms">
    <label htmlFor="agree">
      <input
        type="checkbox"
        id="agree"
        checked={agreed}
        onChange={() => setAgreed(!agreed)}
      />
      I agree to the{' '}
      <a className="terms-link" href="/Terms">
        Terms and Conditions
      </a>
    </label>
  </div>

  <button className="continue-btn" onClick={handleContinue}>
    Continue
  </button>
</div>

        {showWarning && (
          <ModalMessage
            title="Cannot Continue"
            message={
              !agreed
                ? "Please agree to the terms and conditions."
                : "Your cart is empty."
            }
            onClose={() => setShowWarning(false)}
            actionText="OK"
            onAction={() => setShowWarning(false)}
          />
        )}

        {modalData && (
          <ModalMessage
            title={modalData.title}
            message={modalData.message}
            actionText={modalData.actionText}
            onClose={() => setModalData(null)}
            onAction={modalData.onAction}
          />
        )}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}