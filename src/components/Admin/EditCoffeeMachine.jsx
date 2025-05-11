import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';

// Create validation suite
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

export default function EditCoffeeMachine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    color: '',
    capacity: '',
    price: '',
    image_path: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  // Use a single state for validation results
  const [validationResult, setValidationResult] = useState(suite.get());

  useEffect(() => {
    axios.get(`${baseUrl}/get-coffee-machine/${id}`)
      .then(res => {
        // Convert numeric values to strings for form inputs
        const formattedData = {
          ...res.data,
          capacity: res.data.capacity?.toString() || '',
          price: res.data.price?.toString() || ''
        };
        
        // Log the loaded data to help with debugging
        console.log('Loaded machine data:', res.data);
        
        setForm(formattedData);
        // Check the complete form after loading data
        setValidationResult(suite(formattedData));
        
        // If the color from the database is not in our list, add it
        if (res.data.color && !colors.includes(res.data.color)) {
          console.log(`Adding color "${res.data.color}" to available colors`);
          colors.push(res.data.color);
        }
      })
      .catch((err) => {
        console.error('❌ Failed to load machine data:', err);
        setError('Failed to load machine data. Please try again.');
      });
  }, [id]);

  const handleChange = (field, value) => {
    // Update the form with the new value without conversions
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    
    // Run validation on the updated form
    const result = suite(updatedForm, field);
    setValidationResult(result);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  // !!!!!!!!
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
    
  //   // Run full validation on all fields
  //   const result = suite(form);
  //   setValidationResult(result);

  //   if (result.hasErrors()) {
  //     setError('Please fix the validation errors before saving.');
  //     return;
  //   }

  //   try {
  //     setIsSubmitting(true);
      
  //     // First approach: Try with FormData
  //     const formData = new FormData();
      
  //     // Add form data
  //     formData.append('name', form.name || '');
  //     formData.append('color', form.color || '');
  //     formData.append('capacity', form.capacity || '');
  //     formData.append('price', form.price || '');
      
  //     // If there's a new image, add it
  //     if (newImage) {
  //       formData.append('image', newImage);
  //     } else if (form.image_path) {
  //       formData.append('image_path', form.image_path);
  //     }

  //     // Log what we're sending for debugging
  //     console.log('Submitting data:', {
  //       name: form.name,
  //       color: form.color,
  //       capacity: form.capacity,
  //       price: form.price,
  //       hasNewImage: !!newImage
  //     });

  //     // Try with FormData first
  //     try {
  //       await axios.put(`${baseUrl}/update-coffee-machine/${id}`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       });
        
  //       alert('✅ Machine updated successfully');
  //       navigate('/CoffeeCatalog');
  //       return;
  //     } catch (formDataErr) {
  //       console.warn('FormData approach failed, trying JSON:', formDataErr);
        
  //       // If FormData fails, try with JSON
  //       // Create a plain object for the JSON approach
  //       const jsonData = {
  //         name: form.name,
  //         color: form.color,
  //         capacity: Number(form.capacity), // Convert to number for JSON
  //         price: Number(form.price), // Convert to number for JSON
  //         image_path: form.image_path
  //       };
        
  //       await axios.put(`${baseUrl}/update-coffee-machine/${id}`, jsonData);
  //       alert('✅ Machine updated successfully');
  //       navigate('/CoffeeCatalog');
  //     }
  //   } catch (err) {
  //     console.error('❌ Update failed:', err);
  //     setError(err.response?.data?.message || 'Failed to update machine. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Helper function to display errors for a specific field
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Run full validation on all fields
    const result = suite(form);
    setValidationResult(result);
  
    if (result.hasErrors()) {
      setError('Please fix the validation errors before saving.');
      return;
    }
  
    try {
      setIsSubmitting(true);
      
      // Prepare FormData
      const formData = new FormData();
      formData.append('name', form.name || '');
      formData.append('color', form.color || '');
      formData.append('capacity', form.capacity || '');
      formData.append('price', form.price || '');
      
      // Add new image if selected
      if (newImage) {
        formData.append('image', newImage);
      } else if (form.image_path) {
        formData.append('image_path', form.image_path);
      }
  
      // Send the request
      await axios.put(`${baseUrl}/update-coffee-machine/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      alert('✅ Machine updated successfully');
      navigate('/CoffeeCatalog');
    } catch (err) {
      console.error('❌ Update failed:', err);
      setError(err.response?.data?.message || 'Failed to update machine. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  const getFieldErrors = (field) => {
    return validationResult.getErrors(field);
  };

  // Helper function to check if a field has errors
  const hasFieldErrors = (field) => {
    return validationResult.hasErrors(field);
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Edit Coffee Machine</h2>

      {error && <div className="error-message">{error}</div>}

      <label>Name:</label>
      <input
        type="text"
        value={form.name || ''}
        onChange={e => handleChange('name', e.target.value)}
        className={hasFieldErrors('name') ? 'invalid' : ''}
      />
      {hasFieldErrors('name') && (
        <div className="error">{getFieldErrors('name')[0]}</div>
      )}

      <label>Color:</label>
      <select
        value={form.color || ''}
        onChange={e => handleChange('color', e.target.value)}
        className={hasFieldErrors('color') ? 'invalid' : ''}
      >
        <option value="">Select Color</option>
        {colors.map(color => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>
      {form.color && !colors.includes(form.color) && (
        <div className="warning">Current color "{form.color}" is not in the standard list</div>
      )}
      {hasFieldErrors('color') && (
        <div className="error">{getFieldErrors('color')[0]}</div>
      )}

      <label>Water Tank Capacity (ml):</label>
      <input
        type="text"
        value={form.capacity || ''}
        onChange={e => handleChange('capacity', e.target.value)}
        className={hasFieldErrors('capacity') ? 'invalid' : ''}
      />
      {hasFieldErrors('capacity') && (
        <div className="error">{getFieldErrors('capacity')[0]}</div>
      )}

      <label>Price:</label>
      <input
        type="text"
        value={form.price || ''}
        onChange={e => handleChange('price', e.target.value)}
        className={hasFieldErrors('price') ? 'invalid' : ''}
      />
      {hasFieldErrors('price') && (
        <div className="error">{getFieldErrors('price')[0]}</div>
      )}

      <label>Current Image:</label><br />
      {form.image_path && <img src={form.image_path} alt="machine" width="100" />}

      <label>Change Image:</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
      />
      {newImage && (
        <div className="preview">
          <p>New image selected: {newImage.name}</p>
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={isSubmitting ? 'submitting' : ''}
      >
        {isSubmitting ? 'Saving...' : '💾 Save Changes'}
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
        .edit-form input, .edit-form select {
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


