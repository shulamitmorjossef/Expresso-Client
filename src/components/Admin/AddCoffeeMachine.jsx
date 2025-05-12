import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';

// Create validation suite - same validation rules as EditCoffeeMachine
const suite = create((data = {}, field) => {
  // Name - required field validation
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  
  // Name - only allow letters and spaces, limit to 30 characters
  test('name', 'Name must contain only letters (max 30)', () => {
    if (data.name && data.name.trim()) {
      enforce(data.name)
        .matches(/^[\p{L}\s]{1,30}$/u); // Unicode letter class to support all languages
      enforce(data.name.length).lessThanOrEquals(30);
    }
  });

  // Color - required
  test('color', 'Color is required', () => {
    enforce(data.color).isNotEmpty();
  });

  // Capacity - required
  test('capacity', 'Capacity is required', () => {
    enforce(data.capacity).isNotEmpty();
  });

  // Capacity - must be a number
  test('capacity', 'Capacity must contain a number', () => {
    if (data.capacity && data.capacity.toString().trim()) {
      enforce(!isNaN(Number(data.capacity))).equals(true);
    }
  });

  // Capacity - valid range
  test('capacity', 'Capacity must be between 100 and 500 ml', () => {
    if (data.capacity && !isNaN(Number(data.capacity))) {
      const capacityValue = Number(data.capacity);
      enforce(capacityValue)
        .greaterThanOrEquals(100)
        .lessThanOrEquals(500);
    }
  });

  // Price - required
  test('price', 'Price is required', () => {
    enforce(data.price).isNotEmpty();
  });

  // Price - must be a number
  test('price', 'Price must contain a number', () => {
    if (data.price && data.price.toString().trim()) {
      enforce(!isNaN(Number(data.price))).equals(true);
    }
  });

  // Price - must be in range 1-10000
  test('price', 'Price must be between 1 and 10000', () => {
    if (data.price && !isNaN(Number(data.price))) {
      const priceValue = Number(data.price);
      enforce(priceValue)
        .greaterThanOrEquals(1)
        .lessThanOrEquals(10000);
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

  // Available colors - same as in EditCoffeeMachine
  const colors = [
    "Black", 
    "White", 
    "Silver", 
    "Light blue", 
    "Pink", 
    "Purple", 
    "Yellow", 
    "Beige"  
  ];

  // Use a single state for validation results
  const [validationResult, setValidationResult] = useState(suite.get());

  const handleChange = (field, value) => {
    // Update the form with the new value
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    
    // Run validation on the updated form
    const result = suite(updatedForm, field);
    setValidationResult(result);
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
    
    // Run full validation on all fields
    const result = suite(form);
    setValidationResult(result);

    if (result.hasErrors()) {
      setError('Please fix the validation errors before saving.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create FormData object for sending multipart/form-data (including image)
      const formData = new FormData();
      
      // Add form data
      formData.append('name', form.name || '');
      formData.append('color', form.color || '');
      formData.append('capacity', form.capacity || '');
      formData.append('price', form.price || '');
      
      // If there's an image, add it
      if (image) {
        formData.append('image', image);
      }

      // Log what we're sending for debugging
      console.log('Submitting data:', {
        name: form.name,
        color: form.color,
        capacity: form.capacity,
        price: form.price
        // hasImage: !!image
      });

      // Try with FormData approach
      try {
        const response = await axios.post(`${baseUrl}/add-coffee-machines`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        console.log('Server response:', response.data);
        setSuccess('Coffee machine added successfully!');
        
        // Reset form after successful submission
        setForm({
          name: '',
          color: '',
          capacity: '',
          price: '',
        });
        // setImage(null);
        
        // Navigate after short delay to show success message
        setTimeout(() => {
          navigate('/CoffeeCatalog');
        }, 1500);
        
      } catch (formDataErr) {
        console.warn('FormData approach failed, trying JSON:', formDataErr);
        
        // Fallback to JSON approach if FormData fails
        const jsonData = {
          name: form.name,
          color: form.color,
          capacity: Number(form.capacity), // Convert to number for JSON
          price: Number(form.price), // Convert to number for JSON
        };
        
        const response = await axios.post(`${baseUrl}/add-coffee-machines`, jsonData);
        console.log('Server response (JSON):', response.data);
        setSuccess('Coffee machine added successfully!');
        
        // Reset form after successful submission
        setForm({
          name: '',
          color: '',
          capacity: '',
          price: '',
        });
        // setImage(null);
        
        // Navigate after short delay to show success message
        setTimeout(() => {
          navigate('/CoffeeCatalog');
        }, 1500);
      }
    } catch (err) {
      console.error('Add machine failed:', err);
      setError(err.response?.data?.message || 'Failed to add coffee machine. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to display errors for a specific field
  const getFieldErrors = (field) => {
    return validationResult.getErrors(field);
  };

  // Helper function to check if a field has errors
  const hasFieldErrors = (field) => {
    return validationResult.hasErrors(field);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add New Coffee Machine</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <label>Name:</label>
      <input
        type="text"
        value={form.name}
        onChange={e => handleChange('name', e.target.value)}
        className={hasFieldErrors('name') ? 'invalid' : ''}

        />
      {hasFieldErrors('name') && (
        <div className="error">{getFieldErrors('name')[0]}</div>
      )}

      <label>Color:</label>
      <select
        value={form.color}
        onChange={e => handleChange('color', e.target.value)}
        className={hasFieldErrors('color') ? 'invalid' : ''}
      >
        <option value="">Select Color</option>
        {colors.map(color => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>
      {hasFieldErrors('color') && (
        <div className="error">{getFieldErrors('color')[0]}</div>
      )}

      <label>Water Tank Capacity (ml):</label>
      <input
        type="text"
        value={form.capacity}
        onChange={e => handleChange('capacity', e.target.value)}
        className={hasFieldErrors('capacity') ? 'invalid' : ''}
        placeholder="Enter capacity (100-500 ml)"
      />
      {hasFieldErrors('capacity') && (
        <div className="error">{getFieldErrors('capacity')[0]}</div>
      )}

      <label>Price:</label>
      <input
        type="text"
        value={form.price}
        onChange={e => handleChange('price', e.target.value)}
        className={hasFieldErrors('price') ? 'invalid' : ''}
        placeholder="Enter price (1-10000)"
      />
      {hasFieldErrors('price') && (
        <div className="error">{getFieldErrors('price')[0]}</div>
      )}

      <label>Machine Image:</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
      />
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={isSubmitting ? 'submitting' : ''}
      >
        {isSubmitting ? 'Saving...' : ' Add Coffee Machine'}
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
        .add-form input, .add-form select {
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




