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
<<<<<<< HEAD
        <button className="category-button" onClick={() => navigate('/CoffeeCatalog')}>
          <div className="button-image">
            <img src="/images/PageMachine.png" alt="Coffee Machines" />
          </div>
          <div className="button-title">Coffee Machines</div>
        </button>

        <button className="category-button" onClick={() => navigate('/CapsuleCatalog')}>
          <div className="button-image">
            <img src="/images/PageCapsule.png" alt="Capsules" />
          </div>
          <div className="button-title">Capsules</div>
        </button>

        <button className="category-button" onClick={() => navigate('/FrotherCatalog')}>
          <div className="button-image">
            <img src="/images/PageFrother.png" alt="Milk Frothers" />
          </div>
          <div className="button-title">Milk Frothers</div>
        </button>
=======
        <button onClick={() => navigate('/CoffeeCatalog')}> Coffee Machines</button>
        <button onClick={() => navigate('/CapsuleCatalog')}> Capsules</button>
        <button onClick={() => navigate('/FrotherCatalog')}> Milk Frothers</button>
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
      </div>
    </div>
  );
}
