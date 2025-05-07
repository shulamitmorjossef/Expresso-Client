import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CatalogPage.css';

export default function CatalogPage() {
  const navigate = useNavigate();

  return (
    <div className="catalog-page">
      <h1>Catalog Management</h1>
      <p>Select a category to manage:</p>

      <div className="category-buttons">
        <button onClick={() => navigate('/CoffeeCatalog')}>☕ Coffee Machines</button>
        <button onClick={() => navigate('/CapsuleCatalog')}> Capsules</button>
        <button onClick={() => navigate('/FrotherCatalog')}>🥛 Milk Frothers</button>
      </div>
    </div>
  );
}
