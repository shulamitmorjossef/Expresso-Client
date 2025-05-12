import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import baseUrl from '../../config';

export default function CoffeeMachineDetails() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get-coffee-machine/${id}`);
        setMachine(response.data);
      } catch (error) {
        console.error('Error fetching coffee machine:', error);
        alert('Failed to fetch coffee machine details.');
      }
    };

    fetchMachine();
  }, [id]);

  if (!machine) return <p>Loading...</p>;

  return (
    <div className="coffee-machine-details">
      <h2>{machine.name}</h2>
      <img 
        src={`data:image/png;base64,${machine.image}`} 
        alt={machine.name} 
        className="coffee-machine-image"
      />
      <p><strong>Color:</strong> {machine.color}</p>
      <p><strong>Capacity:</strong> {machine.capacity}</p>
      <p><strong>Price:</strong> ${machine.price}</p>
    </div>
  );
}
