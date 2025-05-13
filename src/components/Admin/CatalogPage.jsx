import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CatalogPage.css';



export default function CatalogPage() {
  const navigate = useNavigate();

  return (
    <div className="catalog-page">
  <h2>Catalog Management</h2>
  <p>Select a category to manage:</p>

  <div className="category-grid">
    <div className="category-card" onClick={() => navigate('/CoffeeCatalog')}>
      <img src="/images/PageMachine.png" alt="Coffee Machines" />
      <h3>Coffee Machines</h3>
    </div>
    <div className="category-card" onClick={() => navigate('/CapsuleCatalog')}>
      <img src="/images/PageCapsule.png" alt="Capsules" />
      <h3>Capsules</h3>
    </div>
    <div className="category-card" onClick={() => navigate('/FrotherCatalog')}>
      <img src="/images/PageFrother.png" alt="Milk Frothers" />
      <h3>Milk Frothers</h3>
    </div>
  </div>
  <button className="back-button" onClick={() => navigate('/AdminHome')}>
    Back
  </button>
</div>
  );
}