import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';
import '../styles/EditCapsule.css';
import ModalMessage from '../ModalMessage'; 

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

  test('flavor', 'Flavor is required', () => {
    enforce(data.flavor).isNotEmpty();
  });
  test('flavor', 'Flavor must contain only letters (max 30)', () => {
    if (data.flavor && data.flavor.trim()) {
      enforce(data.flavor).matches(/^[A-Za-z\s\-']{1,30}$/u);
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

export default function EditCapsule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    flavor: '',
    quantity_per_package: '',
    net_weight_grams: '',
    price: '',
    ingredients: '',
  });

  const [newImage, setNewImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [validationResult, setValidationResult] = useState(suite.get());

  useEffect(() => {
    axios.get(`${baseUrl}/get-capsule/${id}`)
      .then(res => {
        const data = {
          ...res.data,
          quantity_per_package: res.data.quantity_per_package?.toString() || '',
          net_weight_grams: res.data.net_weight_grams?.toString() || '',
          price: res.data.price?.toString() || '',
        };

        setForm(data);
        setExistingImage(data.image_url || '');
        setValidationResult(suite(data));
      })
      .catch(err => {
        console.error('Failed to load capsule data:', err);
        setModalData({
          title: 'Error',
          message: 'Failed to load capsule data. Please try again.',
          actionText: 'OK',
          onAction: () => setModalData(null)
        });
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

    const result = suite(form);
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
      formData.append('name', form.name);
      formData.append('flavor', form.flavor);
      formData.append('quantity_per_package', form.quantity_per_package);
      formData.append('net_weight_grams', form.net_weight_grams);
      formData.append('price', form.price);
      formData.append('ingredients', form.ingredients);
      if (newImage) {
        formData.append('image', newImage);
      }

      await axios.put(`${baseUrl}/update-capsule/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setModalData({
        title: 'Success',
        message: 'Capsule updated successfully.',
        actionText: 'OK',
        onAction: () => {
          setModalData(null);
          navigate('/CapsuleCatalog');
        }
      });
    } catch (err) {
      console.error('Update failed:', err);
      setModalData({
        title: 'Error',
        message: err.response?.data?.message || 'Failed to update capsule.',
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
      <form className="edit-capsule-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Edit Capsule</h2>

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

        <label>Current Image:</label><br />
        {existingImage && <img src={existingImage} alt="capsule" width="100" />}

        <label>Change Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {newImage && <div className="preview">New image: {newImage.name}</div>}

        <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <button className="back-button" onClick={() => navigate('/CapsuleCatalog')}>
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
