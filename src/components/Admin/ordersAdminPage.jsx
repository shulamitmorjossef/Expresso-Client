
import React, { useEffect, useState } from 'react';
import baseUrl from '../../config';
import '../DeliveryForm.css';
import OrderInfoModal from '../Customer/OrderInfoModal';
import ModalMessage from '../ModalMessage';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [modalOrderId, setModalOrderId] = useState(null);
  const [error, setError] = useState('');
  const [modalInfo, setModalInfo] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  useEffect(() => {
    fetch(`${baseUrl}/get-all-orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => {
        console.error('Error loading orders:', err);
        setError('Failed to load orders.');
      });
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${baseUrl}/set-status-order/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!res.ok) throw new Error();

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      setModalInfo({
        title: 'Status Updated',
        message: `Order #${orderId} status updated to ${status}.`,
        onClose: () => setModalInfo(null)
      });
    } catch {
      setModalInfo({
        title: 'Update Failed',
        message: 'Failed to update the order status. Please try again later.',
        onClose: () => setModalInfo(null)
      });
    }
  };

  return (
    <div className="page-with-background">
      <div className="delivery-form-container">
        <h2>Manage Orders</h2>
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

              <select
                value={selectedStatus[order.id] || order.status}
                onChange={(e) => setSelectedStatus({ ...selectedStatus, [order.id]: e.target.value })}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <button
                className="submit-btn"
                style={{ marginTop: '10px' }}
                onClick={() => updateOrderStatus(order.id, selectedStatus[order.id] || order.status)}
              >
                Update Status
              </button>

              <button
                className="submit-btn"
                style={{ marginBottom: '5px', marginTop: '5px' }}
                onClick={() => setModalOrderId(order.id)}
              >
                Show Info
              </button>
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
      </div>
    </div>
  );
}