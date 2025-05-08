import baseUrl from '../config';
import React, { useState } from 'react';
import './DeliveryForm.css';

export default function PaymentForm() {
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    idNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString().slice(-2));
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const validate = () => {
    const newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(form.cardName)) newErrors.cardName = 'Only letters and spaces allowed';
    if (!/^\d{16}$/.test(form.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!form.expiryMonth || !form.expiryYear) newErrors.expiry = 'Expiry date is required';
    else {
      const now = new Date();
      const selected = new Date(`20${form.expiryYear}-${form.expiryMonth}-01`);
      if (selected < now) newErrors.expiry = 'Expiry date must be in the future';
    }
    if (!/^\d{3}$/.test(form.cvv)) newErrors.cvv = 'CVV must be 3 digits';
    if (!/^\d{9}$/.test(form.idNumber)) newErrors.idNumber = 'ID must be 9 digits';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      console.log('Payment submitted:', form);
      setSubmitted(true);
  
      const userId = localStorage.getItem('userId');
  
      try {
        const response = await fetch(`${baseUrl}/confirm-order/${userId}`, {
          method: 'POST',
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || 'Order confirmation failed.');
        }
  
        alert(`✅ Order #${data.orderId} confirmed with ${data.itemCount} item(s)!`);
        
  
      } catch (err) {
        console.error('❌ Error confirming order:', err);
        alert('Something went wrong while confirming your order.');
      }
    }
  };
  

  return (
    <div className="delivery-form-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit} className="delivery-form">
        <div className="form-group">
          <label>Cardholder Name:</label>
          <input
            name="cardName"
            type="text"
            value={form.cardName}
            onChange={handleChange}
            className={errors.cardName ? 'invalid' : ''}
            placeholder="Enter cardholder name"
          />
          {errors.cardName && <span className="error">{errors.cardName}</span>}
        </div>

        <div className="form-group">
          <label>Card Number:</label>
          <input
            name="cardNumber"
            type="text"
            value={form.cardNumber}
            onChange={handleChange}
            className={errors.cardNumber ? 'invalid' : ''}
            placeholder="Enter 16-digit card number"
          />
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
        </div>

        <div className="form-group">
          <label>Expiry Date:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              name="expiryMonth"
              value={form.expiryMonth}
              onChange={handleChange}
              className={errors.expiry ? 'invalid' : ''}
            >
              <option value="">Month</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              name="expiryYear"
              value={form.expiryYear}
              onChange={handleChange}
              className={errors.expiry ? 'invalid' : ''}
            >
              <option value="">Year</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          {errors.expiry && <span className="error">{errors.expiry}</span>}
        </div>

        <div className="form-group">
          <label>CVV:</label>
          <input
            name="cvv"
            type="text"
            value={form.cvv}
            onChange={handleChange}
            className={errors.cvv ? 'invalid' : ''}
            placeholder="Enter CVV"
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>

        <div className="form-group">
          <label>ID Number:</label>
          <input
            name="idNumber"
            type="text"
            value={form.idNumber}
            onChange={handleChange}
            className={errors.idNumber ? 'invalid' : ''}
            placeholder="Enter 9-digit ID"
          />
          {errors.idNumber && <span className="error">{errors.idNumber}</span>}
        </div>

        <button type="submit" className="submit-btn">Pay Now</button>
        {submitted && <p className="success-msg">Payment submitted successfully! 💳</p>}
      </form>
    </div>
  );
}
