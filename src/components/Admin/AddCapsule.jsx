import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';

const suite = create((data = {}, field) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  test('name', 'Name must contain only English letters (max 30)', () => {
    if (data.name && data.name.trim()) {
      enforce(data.name).matches(/^[A-Za-z\s]{1,30}$/);
      enforce(data.name.length).lessThanOrEquals(30);
    }
  });

  test('flavor', 'Flavor is required', () => {
    enforce(data.flavor).isNotEmpty();
  });
  test('flavor', 'Flavor must contain only English letters (max 30)', () => {
    if (data.flavor && data.flavor.trim()) {
      enforce(data.flavor).matches(/^[A-Za-z\s]{1,30}$/);
      enforce(data.flavor.length).lessThanOrEquals(30);
    }
  });

  test('quantity_per_package', 'Quantity is required', () => {
    enforce(data.quantity_per_package).isNotEmpty();
  });
  test('quantity_per_package', 'Quantity must be between 1 and 20', () => {
    const value = Number(data.quantity_per_package);
    enforce(!isNaN(value)).equals(true);
    enforce(value).greaterThanOrEquals(1).lessThanOrEquals(20);
  });

  test('net_weight_grams', 'Weight is required', () => {
    enforce(data.net_weight_grams).isNotEmpty();
  });
  test('net_weight_grams', 'Weight must be between 1 and 500 grams', () => {
    const value = Number(data.net_weight_grams);
    enforce(!isNaN(value)).equals(true);
    enforce(value).greaterThanOrEquals(1).lessThanOrEquals(500);
  });

  test('price', 'Price is required', () => {
    enforce(data.price).isNotEmpty();
  });
  test('price', 'Price must be a number greater than 0', () => {
    const value = Number(data.price);
    enforce(!isNaN(value)).equals(true);
    enforce(value).greaterThan(0);
  });

  test('ingredients', 'Ingredients are required', () => {
    enforce(data.ingredients).isNotEmpty();
  });
  test('ingredients', 'Ingredients must be up to 200 chars, English only', () => {
    enforce(data.ingredients.length).lessThanOrEquals(200);
    enforce(data.ingredients).matches(/^(?=.*[A-Za-z])[A-Za-z0-9.,\-\s]+$/);
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
<<<<<<< HEAD
=======
//   const [newImage, setNewImage] = useState(null);
  const [image, setImage] = useState(null);
>>>>>>> f2db5bc988dfbe899464b10333ec06de25b84c8c
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationResult, setValidationResult] = useState(suite.get());

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);

    const result = suite(updated, field);
    setValidationResult(result);
  };

<<<<<<< HEAD
=======
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

>>>>>>> f2db5bc988dfbe899464b10333ec06de25b84c8c
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
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));

<<<<<<< HEAD
=======
      if (image) {
        formData.append('image', image);
      }

    //   console.log('Submitting capsule data:', {
    //     ...form,
    //     hasNewImage: !!newImage
    //   });

      // Use the correct endpoint - the one that exists in your backend
>>>>>>> f2db5bc988dfbe899464b10333ec06de25b84c8c
      try {
        const response = await axios.post(`${baseUrl}/add-capsule`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Server response:', response.data);
<<<<<<< HEAD
        setSuccess('✅ Capsule added successfully!');
=======
        setSuccess('Capsule added successfully!');
        
        // Reset form after successful submission
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
        setForm({
          name: '',
          flavor: '',
          quantity_per_package: '',
          net_weight_grams: '',
          price: '',
          ingredients: '',
        });
        setTimeout(() => navigate('/CapsuleCatalog'), 1500);
      } catch (formDataErr) {
        const jsonData = {
          name: form.name,
          flavor: form.flavor,
          quantity_per_package: Number(form.quantity_per_package),
          net_weight_grams: Number(form.net_weight_grams),
          price: Number(form.price),
          ingredients: form.ingredients
        };

        const response = await axios.post(`${baseUrl}/add-capsule`, jsonData);
        console.log('Server response (JSON):', response.data);
<<<<<<< HEAD
        setSuccess('✅ Capsule added successfully!');
=======
        setSuccess('Capsule added successfully!');
        
        // Reset form after successful submission
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
        setForm({
          name: '',
          flavor: '',
          quantity_per_package: '',
          net_weight_grams: '',
          price: '',
          ingredients: '',
        });
        setTimeout(() => navigate('/CapsuleCatalog'), 1500);
      }
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
<<<<<<< HEAD
    <form className="edit-form" onSubmit={handleSubmit}>
      <h2>Add Capsule</h2>
=======
    <form className="add-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add New Capsule</h2>
>>>>>>> f2db5bc988dfbe899464b10333ec06de25b84c8c
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <label>Name:</label>
<<<<<<< HEAD
      <input
        type="text"
        placeholder="Enter capsule name"
        value={form.name}
        onChange={e => handleChange('name', e.target.value)}
        className={hasFieldErrors('name') ? 'invalid' : ''}
      />
=======
      <input type="text" value={form.name} 
      onChange={e => handleChange('name', e.target.value)} 
      className={hasFieldErrors('name') ? 'invalid' : ''}
      placeholder="Enter capsule name"

       />
>>>>>>> f2db5bc988dfbe899464b10333ec06de25b84c8c
      {hasFieldErrors('name') && <div className="error">{getFieldErrors('name')[0]}</div>}

      <label>Flavor:</label>
      <input
        type="text"
        placeholder="Enter flavor name"
        value={form.flavor}
        onChange={e => handleChange('flavor', e.target.value)}
        className={hasFieldErrors('flavor') ? 'invalid' : ''}
      />
      {hasFieldErrors('flavor') && <div className="error">{getFieldErrors('flavor')[0]}</div>}

      <label>Quantity per Package:</label>
      <input
        type="text"
        placeholder="Enter quantity (1–20)"
        value={form.quantity_per_package}
        onChange={e => handleChange('quantity_per_package', e.target.value)}
        className={hasFieldErrors('quantity_per_package') ? 'invalid' : ''}
      />
      {hasFieldErrors('quantity_per_package') && <div className="error">{getFieldErrors('quantity_per_package')[0]}</div>}

      <label>Net Weight (grams):</label>
      <input
        type="text"
        placeholder="Enter weight in grams (1–500)"
        value={form.net_weight_grams}
        onChange={e => handleChange('net_weight_grams', e.target.value)}
        className={hasFieldErrors('net_weight_grams') ? 'invalid' : ''}
      />
      {hasFieldErrors('net_weight_grams') && <div className="error">{getFieldErrors('net_weight_grams')[0]}</div>}

      <label>Price:</label>
      <input
        type="text"
        placeholder="Enter price (> 0)"
        value={form.price}
        onChange={e => handleChange('price', e.target.value)}
        className={hasFieldErrors('price') ? 'invalid' : ''}
      />
      {hasFieldErrors('price') && <div className="error">{getFieldErrors('price')[0]}</div>}

      <label>Ingredients:</label>
      <input
        type="text"
        placeholder="Enter ingredients (max 200 chars, English only)"
        value={form.ingredients}
        onChange={e => handleChange('ingredients', e.target.value)}
        className={hasFieldErrors('ingredients') ? 'invalid' : ''}
      />
      {hasFieldErrors('ingredients') && <div className="error">{getFieldErrors('ingredients')[0]}</div>}

<<<<<<< HEAD
      <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
=======
      <label>capsule Image:</label>
      <input type="file" 
      accept="image/*" 
      onChange={handleImageChange}
      />

      <button type="submit" 
      disabled={isSubmitting} 
      className={isSubmitting ? 'submitting' : ''}>
>>>>>>> f2db5bc988dfbe899464b10333ec06de25b84c8c
        {isSubmitting ? 'Saving...' : '➕ Add Capsule'}
      </button>

      <style>{`
        .add-form {
          padding: 20px;
          max-width: 400px;
        }
        .add-form label {
          font-weight: bold;
          display: block;
          margin-top: 15px;
        }
        .add-form input {
          width: 100%;
          padding: 6px;
          margin-top: 4px;
        }
        .add-form button {
          margin-top: 20px;
          padding: 8px 16px;
          background-color: #4285f4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .add-form button:hover {
          background-color: #3367d6;
        }
        .add-form button.submitting {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .error {
          color: black;
          font-size: 0.85em;
          margin-top: 4px;
        }
       
        .error-message {
          background-color: #f5f5f5;
          color: black;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left: 4px solid #999;
        }
        .success-message {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left: 4px solid #2e7d32;
        }
        .invalid {
          border: 1px solid red;
        }
      `}</style>
    </form>
  );
}
