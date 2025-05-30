import React, { useEffect, useState } from 'react';



import baseUrl from '../../config';

// const baseUrl = 'http://localhost:3000';
// const baseUrl = 'https://exspresso-server.onrender.com';
// fetch(baseUrl)


const CoffeeMachine = () => {
  const [machine, setMachine] = useState(null);
  const [error, setError] = useState(null);
  const machineId = 1;


  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const res = await fetch(`${baseUrl}/get-coffee-machine/${machineId}`);
        if (!res.ok) throw new Error("Machine not found");
        const data = await res.json();
        setMachine(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMachine();
  }, []);

  if (error) return <p style={{ color: 'red' }}> {error}</p>;
  if (!machine) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>{machine.name}</h2>
      <img
        src={`data:image/jpeg;base64,${machine.image}`} 
        alt={machine.name}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <p><strong>Color:</strong> {machine.color}</p>
      <p><strong>Capacity:</strong> {machine.capacity} cups</p>
      <p><strong>Price:</strong> {machine.price}₪</p>

    <button className="back-button" onClick={() => navigate('/AdminHome')}>
      Back
    </button>

    </div>

  );
};

export default CoffeeMachine;
