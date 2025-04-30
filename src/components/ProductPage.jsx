import React, { useEffect, useState } from 'react';


// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://exspresso-server.onrender.com';


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

  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;
  if (!machine) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>{machine.name}</h2>
      <img
        src={`${machine.image_path}`}
        alt={machine.name}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <p><strong>Color:</strong> {machine.color}</p>
      <p><strong>Capacity:</strong> {machine.capacity} cups</p>
      <p><strong>Price:</strong> {machine.price}₪</p>
    </div>
  );
};

export default CoffeeMachine;
