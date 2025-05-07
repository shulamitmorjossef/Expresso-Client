import React, { useEffect, useState } from 'react';
import './styles/MilkFrothers.css';
import baseUrl from '../config';

export default function MilkFrothers() {
  const [frothers, setFrothers] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/get-all-milk-frothers`)
      .then((res) => res.json())
      .then((data) => setFrothers(data))
      .catch((err) => console.error('Error fetching milk frothers:', err));
  }, []);

  return (
    <div className="milk-products-page">
      <h1>Milk Frothers</h1>
      <div className="milk-product-list">
        {frothers.map((item) => (
          <div className="milk-product-card" key={item.id}>
            <img src={item.image_path} alt={item.name} />
            <div className="milk-product-details">
              <h3>{item.name}</h3>
              <p>{item.price} $</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
