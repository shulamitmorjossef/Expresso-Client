import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';

const suite = create((data = {}, field) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  test('name', 'Name must contain only letters (max 30)', () => {
    if (data.name && data.name.trim()) {
      enforce(data.name).matches(/^[A-Za-z\s]{1,30}$/);
      enforce(data.name.length).lessThanOrEquals(30);
    }
  });

  test('color', 'Color is required', () => {
    enforce(data.color).isNotEmpty();
  });

  test('frothing_type', 'Frothing Type is required', () => {
    enforce(data.frothing_type).isNotEmpty();
  });

  test('capacity', 'Capacity is required', () => {
    enforce(data.capacity).isNotEmpty();
  });
  test('capacity', 'Capacity must be between 100 and 500', () => {
    const value = Number(data.capacity);
    enforce(!isNaN(value)).equals(true);
    enforce(value).greaterThanOrEquals(100).lessThanOrEquals(500);
  });

  test('price', 'Price is required', () => {
    enforce(data.price).isNotEmpty();
  });
  test('price', 'Price must be a number greater than 0', () => {
    const value = Number(data.price);
    enforce(!isNaN(value)).equals(true);
    enforce(value).greaterThan(0);
  });
});

export default function EditFrother() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    color: '',
    frothing_type: '',
    capacity: '',
    price: '',
    image_path: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validationResult, setValidationResult] = useState(suite.get());

  const colors = ["Black", "White", "Silver", "Red", "Blue"];
  const frothingOptions = ["Hot", "Cold", "Both"];

  useEffect(() => {
    axios.get(`${baseUrl}/get-milk-frother/${id}`)
      .then(res => {
        const data = {
          ...res.data,
          capacity: res.data.capacity?.toString() || '',
          price: res.data.price?.toString() || ''
        };
        console.log('Loaded frother data:', data);
        setForm(data);
        setValidationResult(suite(data));
      })
      .catch(err => {
        console.error('Failed to load frother data:', err);
        setError('Failed to load frother data. Please try again.');
      });
  }, [id]);

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setValidationResult(suite(updated, field));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
      formData.append('frothing_type', form.frothing_type);
      formData.append('capacity', form.capacity);
      formData.append('price', form.price);

      if (newImage) {
        formData.append('image', newImage);
      } else if (form.image_path) {
        formData.append('image_path', form.image_path);
      }

      console.log('Submitting frother data:', {
        ...form,
        hasNewImage: !!newImage
      });

      try {
        await axios.put(`${baseUrl}/update-milk-frother/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Frother updated successfully');
        navigate('/FrotherCatalog');
        return;
      } catch (formDataErr) {
        console.warn('FormData failed, trying JSON:', formDataErr);
        const jsonData = {
          name: form.name,
          color: form.color,
          frothing_type: form.frothing_type,
          capacity: Number(form.capacity),
          price: Number(form.price),
          image_path: form.image_path
        };
        await axios.put(`${baseUrl}/update-milk-frother/${id}`, jsonData);
        alert('Frother updated successfully');
        navigate('/FrotherCatalog');
      }
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.response?.data?.message || 'Failed to update frother.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldErrors = (field) => validationResult.getErrors(field);
  const hasFieldErrors = (field) => validationResult.hasErrors(field);

  return (
    <form className="edit-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Edit Milk Frother</h2>
      {error && <div className="error-message">{error}</div>}

      <label>Name:</label>
      <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className={hasFieldErrors('name') ? 'invalid' : ''} />
      {hasFieldErrors('name') && <div className="error">{getFieldErrors('name')[0]}</div>}

      <label>Color:</label>
      <select value={form.color} onChange={e => handleChange('color', e.target.value)} className={hasFieldErrors('color') ? 'invalid' : ''}>
        <option value="">Select Color</option>
        {colors.map(color => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>
      {hasFieldErrors('color') && <div className="error">{getFieldErrors('color')[0]}</div>}

      <label>Frothing Type:</label>
      <select value={form.frothing_type} onChange={e => handleChange('frothing_type', e.target.value)} className={hasFieldErrors('frothing_type') ? 'invalid' : ''}>
        <option value="">Select Type</option>
        {frothingOptions.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      {hasFieldErrors('frothing_type') && <div className="error">{getFieldErrors('frothing_type')[0]}</div>}

      <label>Capacity (ml):</label>
      <input type="text" value={form.capacity} onChange={e => handleChange('capacity', e.target.value)} className={hasFieldErrors('capacity') ? 'invalid' : ''} />
      {hasFieldErrors('capacity') && <div className="error">{getFieldErrors('capacity')[0]}</div>}

      <label>Price:</label>
      <input type="text" value={form.price} onChange={e => handleChange('price', e.target.value)} className={hasFieldErrors('price') ? 'invalid' : ''} />
      {hasFieldErrors('price') && <div className="error">{getFieldErrors('price')[0]}</div>}

      <label>Current Image:</label><br />
      {form.image_path && <img src={form.image_path} alt="frother" width="100" />}

      <label>Upload Image:</label>
      <div className="custom-file-upload">
        <label htmlFor="imageUpload">Upload Image</label>
        <input id="imageUpload" type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
      </div>
      {newImage && <div className="preview">New image: {newImage.name}</div>}

      <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
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
        .custom-file-upload {
          margin-top: 10px;
        }
        .custom-file-upload label {
          display: inline-block;
          padding: 6px 12px;
          cursor: pointer;
          background-color: #4285f4;
          color: white;
          border-radius: 4px;
          font-weight: bold;
        }
        .custom-file-upload input[type="file"] {
          display: none;
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
