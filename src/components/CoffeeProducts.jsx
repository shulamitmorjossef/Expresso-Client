import React, { useEffect, useState } from 'react';
import './styles/CoffeeProducts.css';

export default function CoffeeProducts() {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/get-all-coffee-machines')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch coffee machines");
        return res.json();
      })
      .then((data) => setMachines(data))
      .catch((err) => {
        console.error('Error:', err);
        setError('Failed to load coffee machines');
      });
  }, []);

  return (
    <div className="products-page">
      <h1>Coffee Machines</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="product-list">
        {machines.map((machine) => (
          <div key={machine.id} className="product-card">
            <img src={machine.image_path} alt={machine.name} />
            <div className="product-details">
              <h3>{machine.name}</h3>
              <p>${parseFloat(machine.price).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
