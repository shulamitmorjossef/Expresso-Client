import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';
import '../styles/AddCapsule.css';

const suite = create((data = {}, field) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  test('name', 'Name must contain only English letters (max 30)', () => {
    if (data.name && data.name.trim()) {
      enforce(data.name).matches(/^[A-Za-z\s\-']{1,30}$/u);
    }
  });

  test('flavor', 'Flavor is required', () => {
    enforce(data.flavor).isNotEmpty();
  });
  test('flavor', 'Flavor must contain only English letters (max 30)', () => {
    if (data.flavor && data.flavor.trim()) {
      enforce(data.flavor).matches(/^[A-Za-z\s\-']{1,30}$/u);
    }
  });

  test('quantity_per_package', 'Quantity is required', () => {
    enforce(data.quantity_per_package).isNotEmpty();
  });
  test('quantity_per_package', 'Quantity must be a number between 1 and 20', () => {
    try {
      const value = Number(data.quantity_per_package);
      if (isNaN(value)) throw new Error();
      enforce(value).greaterThanOrEquals(1);
      enforce(value).lessThanOrEquals(20);
    } catch {
      throw new Error("Quantity must be a number between 1 and 20");
    }
  });

  test('net_weight_grams', 'Weight is required', () => {
    enforce(data.net_weight_grams).isNotEmpty();
  });
  test('net_weight_grams', 'Weight must be a number between 1 and 500 grams', () => {
    try {
      const value = Number(data.net_weight_grams);
      if (isNaN(value)) throw new Error();
      enforce(value).greaterThanOrEquals(1);
      enforce(value).lessThanOrEquals(500);
    } catch {
      throw new Error("Weight must be a number between 1 and 500 grams");
    }
  });

  test('price', 'Price is required', () => {
    enforce(data.price).isNotEmpty();
  });
  test('price', 'Price must be a number greater than 0', () => {
    try {
      const value = Number(data.price);
      if (isNaN(value)) throw new Error();
      enforce(value).greaterThan(0);
    } catch {
      throw new Error("Price must be a number greater than 0");
    }
  });

  test('ingredients', 'Ingredients are required', () => {
    enforce(data.ingredients).isNotEmpty();
  });
  
  test('ingredients', 'Ingredients must include at least one English letter and contain only valid characters', () => {
    const value = data.ingredients;
    if (value && value.trim()) {
      enforce(value).matches(/[A-Za-z]/);
      enforce(value).matches(/^[A-Za-z0-9\s.,()\-'"!&%:;]+$/);
    }
  });
});

export default function AddCapsule() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    flavor: '',
    quantity_per_package: '',
    net_weight_grams: '',
    price: '',
    ingredients: '',
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationResult, setValidationResult] = useState(suite.get());

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    suite(updated, field);
    setValidationResult(suite.get());
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    suite(form);
    const result = suite.get();
    setValidationResult(result);

    if (result.hasErrors()) {
      setError('Please fix the validation errors before saving.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (image) formData.append('image', image);

      await axios.post(`${baseUrl}/add-capsule`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('Capsule added successfully!');
      setForm({
        name: '', flavor: '', quantity_per_package: '',
        net_weight_grams: '', price: '', ingredients: '',
      });
      setImage(null);
      setTimeout(() => navigate('/CapsuleCatalog'), 1500);
    } catch (err) {
      console.error('Failed to add capsule:', err);
      setError(err.response?.data?.message || 'Failed to add capsule. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldErrors = (field) => validationResult.getErrors(field);
  const hasFieldErrors = (field) => validationResult.hasErrors(field);

  return (
    <div className="form-background">
      <form className="add-capsule-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Add New Capsule</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {[
          { name: 'name', label: 'Name', placeholder: 'Enter capsule name' },
          { name: 'flavor', label: 'Flavor', placeholder: 'Enter capsule flavor' },
          { name: 'quantity_per_package', label: 'Quantity per Package', placeholder: 'Enter quantity (1-20)' },
          { name: 'net_weight_grams', label: 'Net Weight (grams)', placeholder: 'Enter net weight (1-500 g)' },
          { name: 'price', label: 'Price', placeholder: 'Enter price (must be > 0)' },
          { name: 'ingredients', label: 'Ingredients', placeholder: 'Enter ingredients (max 200 characters)' },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label>{label}:</label>
            <input
              type="text"
              placeholder={placeholder}
              value={form[name]}
              onChange={e => handleChange(name, e.target.value)}
              className={hasFieldErrors(name) ? 'invalid' : ''}
            />
            {hasFieldErrors(name) && <div className="error">{getFieldErrors(name)[0]}</div>}
          </div>
        ))}

        <label>Capsule Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : '➕ Add Capsule'}
        </button>
      </form>
      <button className="back-button" onClick={() => navigate('/CapsuleCatalog')}>
      Back
     </button>
    </div>
  );
}
