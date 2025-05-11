import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';

const AddCoffeeMachine = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('color', color);
    formData.append('capacity', capacity);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const { data } = await axios.post(
        `${baseUrl}/coffee-machines`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      // Navigate to the details page after adding the machine
      navigate(`/Try2/${data.id}`);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Capacity (ml)"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price ($)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Add Coffee Machine</button>
    </form>
  );
};

export default AddCoffeeMachine;
