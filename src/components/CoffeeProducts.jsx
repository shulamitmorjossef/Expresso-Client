import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CoffeeProducts.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';
import ProductModal from './ProductModal';

export default function CoffeeProducts() {
  const [machines, setMachines] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-coffee-machines`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch coffee machines");
        return res.json();
      })
      .then((data) => setMachines(data))
      .catch((err) => {
        console.error('Error:', err);
      });
  }, []);

  const handleAddToCart = async (item, quantity = 1) => {
    const userType = localStorage.getItem('userType');
    const userId = parseInt(localStorage.getItem('userId'));

    if (userType === 'guest' || !userType) {
      alert('You must register or log in to view the cart.');
      navigate('/');
      return;
    }

    const rawType = item.type ||
      (item.capacity && item.frothing_type ? 'milk_frothers' :
       item.capacity ? 'coffee_machines' :
       item.flavor ? 'capsules' : 'unknown');

    try {
      console.log("📦 Sending to server:", {
        user_id: userId,
        product_id: item.id,
        quantity,
        product_type: rawType
      });

      const res = await fetch(`${baseUrl}/add-to-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: item.id,
          quantity,
          product_type: rawType
        }),
      });

      if (!res.ok) throw new Error('Server error');

      alert(`✅ Added ${quantity} x ${item.name} to your cart.`);
    } catch (err) {
      console.error('❌ Error adding to cart:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="products-page">
      <h1>Coffee Machines</h1>
      <div className="product-list">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className="product-card"
            onClick={() => setSelectedProduct({ ...machine, type: 'coffee_machines' })}
          >
            <img src={machine.image_path} alt={machine.name} />
            <div className="product-details">
              <h3>{machine.name}</h3>
              <p>${parseFloat(machine.price).toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart({ ...machine, type: 'coffee_machines' });
                }}
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, quantity) => {
            handleAddToCart(product, quantity);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
