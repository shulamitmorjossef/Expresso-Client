
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';


export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    color: '',
    capacity: '',
    price: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append('image', imageFile);

    try {
      await axios.post(`${baseUrl}/add-coffee-machines`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product added successfully!');
      navigate('/Try2/2');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="add-product-container">

      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <label htmlFor="name">Product Name</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="color">color (optional)</label>
        <input type="text" id="color" value={formData.color} onChange={handleChange} />

        <label htmlFor="capacity">capacity</label>
        <input type="text" id="capacity" value={formData.capacity} onChange={handleChange} required />
        
        <label htmlFor="price">Price</label>
        <input type="number" id="price" min="0" value={formData.price} onChange={handleChange} required />

        <label htmlFor="image">Product Image</label>
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} required />


        <div className="add-product-buttons">
          <button type="submit" className="add-product-button">Confirm</button>
          <button type="reset" className="add-product-button cancel-button">Cancel</button>
        </div>
      </form>
      {/* <BackToHomeButton /> */}
    </div>
  );
}