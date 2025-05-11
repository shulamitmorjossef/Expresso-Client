import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';

// Create validation suite for milk frother
const suite = create((data = {}, field) => {
  // Name - required field validation
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  
  // Name - only allow letters and spaces, limit to 30 characters
  test('name', 'Name must contain only English letters (max 30)', () => {
    if (data.name && data.name.trim()) {
        enforce(data.name).matches(/^[A-Za-z\s]{1,30}$/);
      enforce(data.name.length).lessThanOrEquals(30);
    }
  });

  // Color - required
  test('color', 'Color is required', () => {
    enforce(data.color).isNotEmpty();
  });

  // Frothing type - required
  test('frothingType', 'Frothing type is required', () => {
    enforce(data.frothingType).isNotEmpty();
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

export default function AddMilkFrother() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    color: '',
    frothingType: '',
    capacity: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Available colors
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

  // Available frothing types
  const frothingTypes = [
    "Hot",
    "Cold",
    "Both"
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
      formData.append('frothing_type', form.frothingType || '');
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
        frothing_type: form.frothingType,
        capacity: form.capacity,
        price: form.price,
        hasImage: !!image
      });

      // Try with FormData approach
      try {
        const response = await axios.post(`${baseUrl}/add-milk-frother`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        console.log('Server response:', response.data);
        setSuccess('✅ Milk frother added successfully!');
        
        // Reset form after successful submission
        setForm({
          name: '',
          color: '',
          frothingType: '',
          capacity: '',
          price: '',
        });
        setImage(null);
        
        // Navigate after short delay to show success message
        setTimeout(() => {
          navigate('/FrotherCatalog');
        }, 1500);
        
      } catch (formDataErr) {
        console.warn('FormData approach failed, trying JSON:', formDataErr);
        
        // Fallback to JSON approach if FormData fails
        const jsonData = {
          name: form.name,
          color: form.color,
          frothing_type: form.frothingType,
          capacity: Number(form.capacity), // Convert to number for JSON
          price: Number(form.price), // Convert to number for JSON
        };
        
        const response = await axios.post(`${baseUrl}/add-milk-frother`, jsonData);
        console.log('Server response (JSON):', response.data);
        setSuccess('✅ Milk frother added successfully!');
        
        // Reset form after successful submission
        setForm({
          name: '',
          color: '',
          frothingType: '',
          capacity: '',
          price: '',
        });
        setImage(null);
        
        // Navigate after short delay to show success message
        setTimeout(() => {
          navigate('/FrotherCatalog');
        }, 1500);
      }
    } catch (err) {
      console.error('❌ Add frother failed:', err);
      setError(err.response?.data?.message || 'Failed to add milk frother. Please try again.');
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
      <h2>Add New Milk Frother</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <label>Name:</label>
      <input
        type="text"
        value={form.name}
        onChange={e => handleChange('name', e.target.value)}
        className={hasFieldErrors('name') ? 'invalid' : ''}
        placeholder="Enter frother name"
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

      <label>Frothing Type:</label>
      <select
        value={form.frothingType}
        onChange={e => handleChange('frothingType', e.target.value)}
        className={hasFieldErrors('frothingType') ? 'invalid' : ''}
      >
        <option value="">Select Frothing Type</option>
        {frothingTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      {hasFieldErrors('frothingType') && (
        <div className="error">{getFieldErrors('frothingType')[0]}</div>
      )}

      <label>Capacity (ml):</label>
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

      <label>Frother Image:</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
      />
      {image && (
        <div className="preview">
          <p>Selected image: {image.name}</p>
          <img 
            src={URL.createObjectURL(image)} 
            alt="Preview" 
            style={{ maxWidth: '100px', marginTop: '10px' }} 
          />
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={isSubmitting ? 'submitting' : ''}
      >
        {isSubmitting ? 'Saving...' : '➕ Add Milk Frother'}
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
          color: black;
          font-size: 0.85em;
          margin-top: 4px;
        }
        .error-message {
          background-color: #ffebee;
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
        .preview {
          margin-top: 10px;
          font-size: 0.9em;
          color: #555;
        }
      `}</style>
    </form>
  );
}