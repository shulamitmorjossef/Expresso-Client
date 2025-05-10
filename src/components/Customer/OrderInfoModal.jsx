import React, { useEffect, useState } from 'react';
import baseUrl from '../../config';
import '../styles/OrderInfoModal.css'; // תעשי בו סטיילינג דומה לדף משלוח


export default function OrderInfoModal({ orderId, onClose }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${baseUrl}/get-order-details/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => {
        console.error('❌ Error fetching order info:', err);
        setError('Failed to load order details.');
      });
  }, [orderId]);

  if (!order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h3>Order #{order.order_id}</h3>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
        <p><strong>Email:</strong> {order.email}</p>

        <div className="modal-products">
          {order.products.map((p, i) => (
            <div key={i} className="modal-product-item">
              <img src={p.image_path} alt={p.product_name} className="modal-product-img" />
              <div>
                <p><strong>{p.product_name}</strong></p>
                <p>Quantity: {p.quantity}</p>
                <p>Price: ${parseFloat(p.price).toFixed(2)}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
