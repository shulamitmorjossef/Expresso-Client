import React, { useEffect, useState } from 'react';
import baseUrl from '../../config';
import '../DeliveryForm.css';
import OrderInfoModal from './OrderInfoModal';
import ModalMessage from '../ModalMessage'; 

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [modalOrderId, setModalOrderId] = useState(null);
  const [error, setError] = useState('');
  const [modalInfo, setModalInfo] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`${baseUrl}/orders/full/${userId}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => {
        console.error('Error loading orders:', err);
        setError('Failed to load your orders.');
      });
  }, []);

  const cancelOrderConfirmed = async (orderId) => {
    try {
      const res = await fetch(`${baseUrl}/cancel-order/${orderId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
      setModalInfo({
        title: 'Order Cancelled',
        message: 'Your order has been successfully cancelled.',
        onClose: () => setModalInfo(null)
      });
    } catch {
      setModalInfo({
        title: 'Cancel Failed',
        message: 'Failed to cancel the order. Please try again later.',
        onClose: () => setModalInfo(null)
      });
    }
  };

  const cancelOrder = (orderId) => {
    setConfirmCancelId(orderId);
  };

  return (
    <div className="page-with-background">
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

        {modalInfo && (
          <ModalMessage
            title={modalInfo.title}
            message={modalInfo.message}
            onClose={modalInfo.onClose}
            onAction={modalInfo.onClose}
            actionText="OK"
          />
        )}

        {confirmCancelId && (
          <ModalMessage
            title="Are you sure?"
            message="Do you really want to cancel this order?"
            onClose={() => setConfirmCancelId(null)}
            onAction={() => {
              cancelOrderConfirmed(confirmCancelId);
              setConfirmCancelId(null);
            }}
            actionText="Yes, Cancel"
          />
        )}
      </div>
    </div>
  );
}
