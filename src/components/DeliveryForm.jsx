import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DeliveryForm.css';

export default function DeliveryForm() {
  const [form, setForm] = useState({
    city: '',
    street: '',
    building: '',
    apartment: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'city':
        return /^[A-Za-z\s]+$/.test(value.trim())
          ? ''
          : 'City must contain only letters and spaces';
      case 'street':
        return /^[A-Za-z\s]+$/.test(value.trim())
          ? ''
          : 'Street must contain only letters, numbers and spaces';
      case 'building':
      case 'apartment':
        return /^\d+$/.test(value.trim())
          ? ''
          : `${name[0].toUpperCase() + name.slice(1)} must be a number`;
      case 'phone':
        return /^\d{10}$/.test(value)
          ? ''
          : 'Phone must be exactly 10 digits';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));

    const allValid = Object.entries(updatedForm).every(
      ([key, val]) => validateField(key, val) === ''
    );
    setFormIsValid(allValid);
  };

  return (
    <div className="delivery-form-container">
      <h2>Shipping Details</h2>
      <form className="delivery-form" onSubmit={(e) => e.preventDefault()}>
        {['city', 'street', 'building', 'apartment', 'phone'].map((field) => (
          <div key={field} className="form-group">
            <label>{field[0].toUpperCase() + field.slice(1)}:</label>
            <input
              name={field}
              type="text"
              value={form[field]}
              onChange={handleChange}
              className={errors[field] ? 'invalid' : ''}
              placeholder={`Enter your ${field}`}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}

        {formIsValid ? (
          <Link to="/Payment" className="submit-btn">
            Continue to payment
          </Link>
        ) : (
          <button
            type="button"
            className="submit-btn"
            onClick={() => alert('Please complete the form correctly.')}
          >
            Continue to payment
          </button>
        )}
      </form>
    </div>
  );
}
