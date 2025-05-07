import React, { useEffect, useState } from 'react';
import './styles/Capsules.css';

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/get-all-capsule')
      .then((res) => res.json())
      .then((data) => setCapsules(data))
      .catch((err) => console.error('Error fetching capsules:', err));
  }, []);

  return (
    <div className="capsules-page">
      <h1>Capsules</h1>
      <div className="capsule-list">
        {capsules.map((item) => (
          <div className="capsule-card" key={item.id}>
            <img src={item.image_path} alt={item.name} />
            <div className="capsule-details">
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
