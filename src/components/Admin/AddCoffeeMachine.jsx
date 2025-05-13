import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';
import '../styles/AddCoffeeMachine.css';

// Validation suite
const suite = create((data = {}, field) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  test('name', 'Name must contain only English letters (max 30)', () => {
    if (data.name && data.name.trim()) {
      enforce(data.name).matches(/^[A-Za-z\s\-']{1,30}$/u);
      enforce(data.name.length).lessThanOrEquals(30);
    }
  });

  test('color', 'Color is required', () => {
    enforce(data.color).isNotEmpty();
  });

  test('capacity', 'Capacity is required', () => {
    enforce(data.capacity).isNotEmpty();
  });
  test('capacity', 'Capacity must contain a number', () => {
    if (data.capacity && data.capacity.toString().trim()) {
      enforce(!isNaN(Number(data.capacity))).equals(true);
    }
  });
  test('capacity', 'Capacity must be between 100 and 500 ml', () => {
    if (data.capacity && !isNaN(Number(data.capacity))) {
      const value = Number(data.capacity);
      enforce(value).greaterThanOrEquals(100).lessThanOrEquals(500);
    }
  });

  test('price', 'Price is required', () => {
    enforce(data.price).isNotEmpty();
  });
  test('price', 'Price must contain a number', () => {
    if (data.price && data.price.toString().trim()) {
      enforce(!isNaN(Number(data.price))).equals(true);
    }
  });
  test('price', 'Price must be between 1 and 10000', () => {
    if (data.price && !isNaN(Number(data.price))) {
      const value = Number(data.price);
      enforce(value).greaterThanOrEquals(1).lessThanOrEquals(10000);
    }
  });
});

export default function AddCoffeeMachine() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    color: '',
    capacity: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationResult, setValidationResult] = useState(suite.get());

  const colors = ["Black", "White", "Silver", "Light blue", "Pink", "Purple", "Yellow", "Beige"];

  const handleChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    const result = suite(updatedForm, field);
    setValidationResult(result);
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = suite(form);
    setValidationResult(result);
    if (result.hasErrors()) {
      setError('Please fix the validation errors before saving.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('color', form.color);
      formData.append('capacity', form.capacity);
      formData.append('price', form.price);
      if (image) formData.append('image', image);

      const response = await axios.post(`${baseUrl}/add-coffee-machines`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Server response:', response.data);
      setSuccess('Coffee machine added successfully!');
      setForm({ name: '', color: '', capacity: '', price: '' });
      setImage(null);

      setTimeout(() => navigate('/CoffeeCatalog'), 1500);
    } catch (err) {
      console.error('Add machine failed:', err);
      setError(err.response?.data?.message || 'Failed to add coffee machine. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldErrors = (field) => validationResult.getErrors(field);
  const hasFieldErrors = (field) => validationResult.hasErrors(field);

  return (
    <div className="form-background">
      <form className="add-coffee-machine-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Add New Coffee Machine</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <label>Name:</label>
        <input
          type="text"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          className={hasFieldErrors('name') ? 'invalid' : ''}
          placeholder="Enter machine name"
        />
        {hasFieldErrors('name') && <div className="error">{getFieldErrors('name')[0]}</div>}

        <label>Color:</label>
        <select
          value={form.color}
          onChange={e => handleChange('color', e.target.value)}
          className={hasFieldErrors('color') ? 'invalid' : ''}
        >
          <option value="">Select Color</option>
          {colors.map(color => <option key={color} value={color}>{color}</option>)}
        </select>
        {hasFieldErrors('color') && <div className="error">{getFieldErrors('color')[0]}</div>}

        <label>Water Tank Capacity (ml):</label>
        <input
          type="text"
          value={form.capacity}
          onChange={e => handleChange('capacity', e.target.value)}
          className={hasFieldErrors('capacity') ? 'invalid' : ''}
          placeholder="Enter capacity (100-500 ml)"
        />
        {hasFieldErrors('capacity') && <div className="error">{getFieldErrors('capacity')[0]}</div>}

        <label>Price:</label>
        <input
          type="text"
          value={form.price}
          onChange={e => handleChange('price', e.target.value)}
          className={hasFieldErrors('price') ? 'invalid' : ''}
          placeholder="Enter price (1-10000)"
        />
        {hasFieldErrors('price') && <div className="error">{getFieldErrors('price')[0]}</div>}

        <label>Machine Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
          {isSubmitting ? 'Saving...' : 'Add Coffee Machine'}
        </button>
      </form>
    </div>
  );
}
