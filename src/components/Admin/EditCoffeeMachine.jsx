import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';

// Create validation suite
const suite = create((data = {}, field) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  test('color', 'Color is required', () => {
    enforce(data.color).isNotEmpty();
  });
  test('capacity', 'Capacity is required', () => {
    enforce(data.capacity).isNotEmpty();
  });
  test('price', 'Price is required', () => {
    enforce(data.price).isNotEmpty();
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
  });
  const [newImage, setNewImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load coffee machine data on mount
  useEffect(() => {
    axios.get(`${baseUrl}/get-coffee-machine/${id}`)
      .then(res => {
        const formattedData = {
          name: res.data.name || '',
          color: res.data.color || '',
          capacity: res.data.capacity?.toString() || '',
          price: res.data.price?.toString() || '',
        };

        setForm(formattedData);
        setExistingImage(res.data.image_url || '');
      })
      .catch((err) => {
        console.error('Failed to load machine data:', err);
        setError('Failed to load machine data. Please try again.');
      });
  }, [id]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Run full validation on all fields
    const result = suite(form);
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
      }

      // Send the request
      await axios.put(`${baseUrl}/update-coffee-machine/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Machine updated successfully');
      navigate('/CoffeeCatalog');
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.response?.data?.message || 'Failed to update machine. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      />

      <label>Color:</label>
      <input
        type="text"
        value={form.color || ''}
        onChange={e => handleChange('color', e.target.value)}
      />

      <label>Water Tank Capacity (ml):</label>
      <input
        type="text"
        value={form.capacity || ''}
        onChange={e => handleChange('capacity', e.target.value)}
      />

      <label>Price:</label>
      <input
        type="text"
        value={form.price || ''}
        onChange={e => handleChange('price', e.target.value)}
      />

      <label>Current Image:</label><br />
      {existingImage && <img src={existingImage} alt="machine" width="100" />}

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
        .error-message {
          background-color: #ffebee;
          color: #d32f2f;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }
      `}</style>
    </form>
  );
}