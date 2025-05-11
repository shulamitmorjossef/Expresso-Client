import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';

const suite = create((data = {}, field) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  test('name', 'Name must contain only letters (max 30)', () => {
    if (data.name && data.name.trim()) {
      enforce(data.name).matches(/^[\p{L}\s]{1,30}$/u);
      enforce(data.name.length).lessThanOrEquals(30);
    }
  });

  test('flavor', 'Flavor is required', () => {
    enforce(data.flavor).isNotEmpty();
  });
  test('flavor', 'Flavor must contain only letters (max 30)', () => {
    if (data.flavor && data.flavor.trim()) {
      enforce(data.flavor).matches(/^[\p{L}\s]{1,30}$/u);
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
  test('ingredients', 'Ingredients must be up to 200 characters', () => {
    enforce(data.ingredients.length).lessThanOrEquals(200);
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
//   const [newImage, setNewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Added success message state
  const [validationResult, setValidationResult] = useState(suite.get());

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setValidationResult(suite(updated, field));
  };

//   const handleImageChange = (e) => {
//     if (e.target.files?.[0]) {
//       setNewImage(e.target.files[0]);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); // Clear any previous success message
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
      formData.append('flavor', form.flavor);
      formData.append('quantity_per_package', form.quantity_per_package);
      formData.append('net_weight_grams', form.net_weight_grams);
      formData.append('price', form.price);
      formData.append('ingredients', form.ingredients);

    //   if (newImage) {
    //     formData.append('image', newImage);
    //   }

    //   console.log('Submitting capsule data:', {
    //     ...form,
    //     hasNewImage: !!newImage
    //   });

      // Use the correct endpoint - the one that exists in your backend
      try {
        const response = await axios.post(`${baseUrl}/add-capsule`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        console.log('Server response:', response.data);
        setSuccess('Capsule added successfully!');
        
        // Reset form after successful submission
        setForm({
          name: '',
          flavor: '',
          quantity_per_package: '',
          net_weight_grams: '',
          price: '',
          ingredients: '',
        });
        // setNewImage(null);
        
        // Navigate after short delay to show success message
        setTimeout(() => {
          navigate('/CapsuleCatalog');
        }, 1500);
        
      } catch (formDataErr) {
        console.warn('FormData approach failed, trying JSON:', formDataErr);

        // Convert numeric string values to actual numbers for JSON approach
        const jsonData = {
          name: form.name,
          flavor: form.flavor,
          quantity_per_package: Number(form.quantity_per_package),
          net_weight_grams: Number(form.net_weight_grams),
          price: Number(form.price),
          ingredients: form.ingredients
        };

        const response = await axios.post(`${baseUrl}/add-capsule`, jsonData, {
        });
        
        console.log('Server response (JSON):', response.data);
        setSuccess('Capsule added successfully!');
        
        // Reset form after successful submission
        setForm({
          name: '',
          flavor: '',
          quantity_per_package: '',
          net_weight_grams: '',
          price: '',
          ingredients: '',
        });
        // setNewImage(null);
        
        // Navigate after short delay to show success message
        setTimeout(() => {
          navigate('/CapsuleCatalog');
        }, 1500);
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
    <form className="edit-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add Capsule</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <label>Name:</label>
      <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className={hasFieldErrors('name') ? 'invalid' : ''} />
      {hasFieldErrors('name') && <div className="error">{getFieldErrors('name')[0]}</div>}

      <label>Flavor:</label>
      <input type="text" value={form.flavor} onChange={e => handleChange('flavor', e.target.value)} className={hasFieldErrors('flavor') ? 'invalid' : ''} />
      {hasFieldErrors('flavor') && <div className="error">{getFieldErrors('flavor')[0]}</div>}

      <label>Quantity per Package:</label>
      <input type="text" value={form.quantity_per_package} onChange={e => handleChange('quantity_per_package', e.target.value)} className={hasFieldErrors('quantity_per_package') ? 'invalid' : ''} />
      {hasFieldErrors('quantity_per_package') && <div className="error">{getFieldErrors('quantity_per_package')[0]}</div>}

      <label>Net Weight (grams):</label>
      <input type="text" value={form.net_weight_grams} onChange={e => handleChange('net_weight_grams', e.target.value)} className={hasFieldErrors('net_weight_grams') ? 'invalid' : ''} />
      {hasFieldErrors('net_weight_grams') && <div className="error">{getFieldErrors('net_weight_grams')[0]}</div>}

      <label>Price:</label>
      <input type="text" value={form.price} onChange={e => handleChange('price', e.target.value)} className={hasFieldErrors('price') ? 'invalid' : ''} />
      {hasFieldErrors('price') && <div className="error">{getFieldErrors('price')[0]}</div>}

      <label>Ingredients:</label>
      <input type="text" value={form.ingredients} onChange={e => handleChange('ingredients', e.target.value)} className={hasFieldErrors('ingredients') ? 'invalid' : ''} />
      {hasFieldErrors('ingredients') && <div className="error">{getFieldErrors('ingredients')[0]}</div>}

      {/* <label>Upload Image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {newImage && (
        <div className="preview">
          <span>New image: {newImage.name}</span>
          <img 
            src={URL.createObjectURL(newImage)} 
            alt="Preview" 
            className="image-preview" 
            style={{ display: 'block', maxWidth: '100px', maxHeight: '100px', marginTop: '8px' }} 
          />
        </div>
      )} */}

      <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
        {isSubmitting ? 'Saving...' : '➕ Add Capsule'}
      </button>

      <style>{`
        .edit-form {
          padding: 20px;
          max-width: 400px;
        }
        .edit-form label {
          font-weight: bold;
          display: block;
          margin-top: 15px;
        }
        .edit-form input {
          width: 100%;
          padding: 6px;
          margin-top: 4px;
        }
        .edit-form button {
          margin-top: 20px;
          padding: 8px 16px;
          background-color: #4285f4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .edit-form button:hover {
          background-color: #3367d6;
        }
        .edit-form button.submitting {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .error {
          color: red;
          font-size: 0.85em;
          margin-top: 4px;
        }
        .error-message {
          background-color: #ffebee;
          color: #d32f2f;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left: 4px solid #d32f2f;
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
        .preview {
          margin-top: 10px;
          font-size: 0.9em;
          color: #555;
        }
      `}</style>
    </form>
  );
}