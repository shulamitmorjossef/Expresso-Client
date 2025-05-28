
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';
import '../styles/EditCoffeeMachine.css';
import ModalMessage from '../ModalMessage'; 

// Validation suite
const suite = create((data = {}, field) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });

  test('name', 'Name must contain only English letters', () => {
    if (data.name && data.name.trim()) {
      enforce(data.name).matches(/^[A-Za-z\s\-']{1,30}$/);
    }
  });

  test('color', 'Color is required', () => {
    enforce(data.color).isNotEmpty();
  });

  test('capacity', 'Capacity is required', () => {
    enforce(data.capacity).isNotEmpty();
  });

  test('capacity', 'Capacity must be a number between 100 and 500 ml', () => {
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
  const [modalData, setModalData] = useState(null);
  const [validationResult, setValidationResult] = useState(suite.get());

  const colors = ["Black", "White", "Silver", "Light blue", "Pink", "Purple", "Yellow", "Beige"];

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
        setModalData({
          title: 'Error',
          message: 'Failed to load machine data. Please try again.',
          actionText: 'OK',
          onAction: () => setModalData(null)
        });
      });
  }, [id]);

  const handleChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    suite(updatedForm, field);
    setValidationResult(suite.get());
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    suite(form);
    const result = suite.get();
    setValidationResult(result);

    if (result.hasErrors()) {
      setModalData({
        title: 'Validation Error',
        message: 'Please fix the validation errors before saving.',
        actionText: 'OK',
        onAction: () => setModalData(null)
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('name', form.name || '');
      formData.append('color', form.color || '');
      formData.append('capacity', form.capacity || '');
      formData.append('price', form.price || '');
      if (newImage) formData.append('image', newImage);

      await axios.put(`${baseUrl}/update-coffee-machine/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setModalData({
        title: 'Success',
        message: 'Machine updated successfully.',
        actionText: 'OK',
        onAction: () => {
          setModalData(null);
          navigate('/CoffeeCatalog');
        }
      });
    } catch (err) {
      console.error('Update failed:', err);
      setModalData({
        title: 'Error',
        message: err.response?.data?.message || 'Failed to update machine. Please try again.',
        actionText: 'OK',
        onAction: () => setModalData(null)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldErrors = (field) => validationResult.getErrors(field);
  const hasFieldErrors = (field) => validationResult.hasErrors(field);

  return (
    <div className="form-background">
      <form className="edit-coffee-machine-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Edit Coffee Machine</h2>

        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter coffee machine name"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          className={hasFieldErrors('name') ? 'invalid' : ''}
        />
        {hasFieldErrors('name') && <div className="error">{getFieldErrors('name')[0]}</div>}

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
        {hasFieldErrors('color') && <div className="error">{getFieldErrors('color')[0]}</div>}

        <label>Water Tank Capacity (ml):</label>
        <input
          type="text"
          placeholder="Enter capacity (100-500 ml)"
          value={form.capacity}
          onChange={e => handleChange('capacity', e.target.value)}
          className={hasFieldErrors('capacity') ? 'invalid' : ''}
        />
        {hasFieldErrors('capacity') && <div className="error">{getFieldErrors('capacity')[0]}</div>}

        <label>Price:</label>
        <input
          type="text"
          placeholder="Enter price (must be > 0)"
          value={form.price}
          onChange={e => handleChange('price', e.target.value)}
          className={hasFieldErrors('price') ? 'invalid' : ''}
        />
        {hasFieldErrors('price') && <div className="error">{getFieldErrors('price')[0]}</div>}

        {existingImage && (
          <>
            <label>Current Image:</label>
            <img src={existingImage} alt="machine" width="100" style={{ marginBottom: '10px' }} />
          </>
        )}

        <label>Change Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {newImage && <div className="preview">New image selected: {newImage.name}</div>}

        <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <button className="back-button" onClick={() => navigate('/CoffeeCatalog')}>
        Back
      </button>

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          actionText={modalData.actionText}
          onAction={modalData.onAction}
        />
      )}
    </div>
  );
}
