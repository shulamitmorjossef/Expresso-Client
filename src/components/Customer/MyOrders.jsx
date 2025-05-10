import React, { useEffect, useState } from 'react';
import baseUrl from '../../config';
import '../DeliveryForm.css';
import OrderInfoModal from './OrderInfoModal';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [modalOrderId, setModalOrderId] = useState(null);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`${baseUrl}/orders/full/${userId}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => {
        console.error('❌ Error loading orders:', err);
        setError('Failed to load your orders.');
      });
  }, []);

  const cancelOrder = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${baseUrl}/cancel-order/${orderId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();
      alert('✅ Order cancelled.');
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
    } catch {
      alert('❌ Failed to cancel order.');
    }
  };

  return (
    <div className="delivery-form-container">
      <h2>My Orders</h2>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="form-group" style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            <p><strong>Order #{order.id}</strong></p>
            <p>Status: {order.status}</p>
            <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
            <p>Total: ${parseFloat(order.total || 0).toFixed(2)}</p>
            
            <button
              className="submit-btn"
              style={{ marginBottom: '5px' }}
              onClick={() => setModalOrderId(order.id)}
            >
              Show Info
            </button>

            {order.status === 'pending' && (
              <button
                className="submit-btn"
                style={{ backgroundColor: '#a94442', marginTop: '5px' }}
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}

      {modalOrderId && (
        <OrderInfoModal
          orderId={modalOrderId}
          onClose={() => setModalOrderId(null)}
        />
      )}
    </div>
  );
}
