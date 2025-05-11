import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import baseUrl from '../../config';

const CoffeeMachineDetail = () => {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    async function fetchMachine() {
      try {
        const { data } = await axios.get(`${baseUrl}/coffee-machines/${id}`);
        setMachine(data);
      } catch (err) {
        console.error('Error fetching machine:', err);
      }
    }
    fetchMachine();
  }, [id]);

  if (!machine) return <p>Loading...</p>;

  return (
    <div>
      <h2>{machine.name}</h2>
      <img
        src={`${baseUrl}${machine.image_path}`}
        alt={machine.name}
        style={{ maxWidth: '400px' }}
      />
      <p>Color: {machine.color}</p>
      <p>Capacity: {machine.capacity} ml</p>
      <p>Price: ${machine.price}</p>
    </div>
  );
};

export default CoffeeMachineDetail;
