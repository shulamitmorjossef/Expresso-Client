// import React, { useEffect, useState } from 'react';
// import baseUrl from '../../config';
// import '../DeliveryForm.css';
// import OrderInfoModal from './OrderInfoModal';
// import ModalMessage from '../ModalMessage'; 
// import { useNavigate } from 'react-router-dom';

// export default function MyOrders() {

//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [modalOrderId, setModalOrderId] = useState(null);
//   const [error, setError] = useState('');
//   const [modalInfo, setModalInfo] = useState(null);
//   const [confirmCancelId, setConfirmCancelId] = useState(null);
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     fetch(`${baseUrl}/orders/full/${userId}`)
//       .then(res => res.json())
//       .then(data => setOrders(data))
//       .catch(err => {
//         console.error('Error loading orders:', err);
//         setError('Failed to load your orders.');
//       });
//   }, []);

//   const cancelOrderConfirmed = async (orderId) => {
//     try {
//       const res = await fetch(`${baseUrl}/cancel-order/${orderId}`, {
//         method: 'DELETE',
//       });

//       if (!res.ok) throw new Error();

//       setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
//       setModalInfo({
//         title: 'Order Cancelled',
//         message: 'Your order has been successfully cancelled.',
//         onClose: () => setModalInfo(null)
//       });
//     } catch {
//       setModalInfo({
//         title: 'Cancel Failed',
//         message: 'Failed to cancel the order. Please try again later.',
//         onClose: () => setModalInfo(null)
//       });
//     }
//   };

//   const cancelOrder = (orderId) => {
//     setConfirmCancelId(orderId);
//   };

//   return (
//     <div className="page-with-background">
//       <div className="delivery-form-container">
//         <h2>My Orders</h2>
//         {error && <p className="error">{error}</p>}
//         {orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           orders.map(order => (
//             <div key={order.id} className="form-group" style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
//               <p><strong>Order #{order.id}</strong></p>
//               <p>Status: {order.status}</p>
//               <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
//               <p>Total: ${parseFloat(order.total || 0).toFixed(2)}</p>

//               <button
//                 className="submit-btn"
//                 style={{ marginBottom: '5px' }}
//                 onClick={() => setModalOrderId(order.id)}
//               >
//                 Show Info
//               </button>

//               {order.status === 'pending' && (
//                 <button
//                   className="submit-btn"
//                   style={{ backgroundColor: '#a94442', marginTop: '5px' }}
//                   onClick={() => cancelOrder(order.id)}
//                 >
//                   Cancel Order
//                 </button>
//               )}
//             </div>
//           ))
//         )}

//         {modalOrderId && (
//           <OrderInfoModal
//             orderId={modalOrderId}
//             onClose={() => setModalOrderId(null)}
//           />
//         )}

//         {modalInfo && (
//           <ModalMessage
//             title={modalInfo.title}
//             message={modalInfo.message}
//             onClose={modalInfo.onClose}
//             onAction={modalInfo.onClose}
//             actionText="OK"
//           />
//         )}

//         {confirmCancelId && (
//           <ModalMessage
//             title="Are you sure?"
//             message="Do you really want to cancel this order?"
//             onClose={() => setConfirmCancelId(null)}
//             onAction={() => {
//               cancelOrderConfirmed(confirmCancelId);
//               setConfirmCancelId(null);
//             }}
//             actionText="Yes, Cancel"
//           />
//         )}
//       </div>
//       <button className="back-button" onClick={() => navigate('/CustomerHome')}>
//       Back
//     </button>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import baseUrl from '../../config';
import '../DeliveryForm.css';
import OrderInfoModal from './OrderInfoModal';
import ModalMessage from '../ModalMessage';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const navigate = useNavigate();
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
  const handleReorder = async (orderId) => {
    try {
      const res = await fetch(`${baseUrl}/get-order-details/${orderId}`);
      const order = await res.json();
  
      if (!order.products || order.products.length === 0) {
        throw new Error('No products found in order');
      }
  
      const userId = localStorage.getItem('userId');
  
      const success = [];
      const partial = [];
      const failed = [];
  
      for (const product of order.products) {
        const response = await fetch(`${baseUrl}/add-to-cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            product_id: product.product_id,
            quantity: product.quantity,
            product_type: product.product_type
          })
        });
  
        if (response.ok) {
          success.push(`${product.product_name} (x${product.quantity})`);
        } else {
          const data = await response.json();
          const msg = data.error || '';
  
          if (msg.includes('Only') && msg.includes('available')) {
            const match = msg.match(/Only (\d+) item/);
            const available = match ? parseInt(match[1]) : 0;
  
            if (available > 0) {
              const retryRes = await fetch(`${baseUrl}/add-to-cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  user_id: userId,
                  product_id: product.product_id,
                  quantity: available,
                  product_type: product.product_type
                })
              });
  
              if (retryRes.ok) {
                partial.push(`${product.product_name} (requested: ${product.quantity}, added: ${available})`);
                continue;
              }
            }
          }
  
          failed.push(`${product.product_name} (requested: ${product.quantity})`);
        }
      }
  
      let message = '';
      if (success.length > 0) {
        message += `✔️ Fully added:\n${success.map(s => `• ${s}`).join('\n')}\n\n`;
      }
      if (partial.length > 0) {
        message += `⚠️ Partially added:\n${partial.map(p => `• ${p}`).join('\n')}\n\n`;
      }
      if (failed.length > 0) {
        message += `❌ Not added:\n${failed.map(f => `• ${f}`).join('\n')}`;
      }
  
      setModalInfo({
        title: 'Reorder Summary',
        message: message.trim(),
        onClose: () => {
          setModalInfo(null);
          navigate('/CartPage');
        },
        onAction: () => {
          setModalInfo(null);
          navigate('/CartPage');
        },
        actionText: 'Go to Cart'
      });
  
    } catch (err) {
      console.error('Error during reorder:', err);
      setModalInfo({
        title: 'Reorder Failed',
        message: 'Something went wrong during reorder. Please try again later.',
        onClose: () => setModalInfo(null),
        onAction: () => setModalInfo(null),
        actionText: 'OK'
      });
    }
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

              <button
                className="submit-btn"
                style={{ backgroundColor: '#4CAF50', marginTop: '5px' }}
                onClick={() => handleReorder(order.id)}
              >
                Reorder
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

      <button className="back-button" onClick={() => navigate('/CustomerHome')}>
        Back
      </button>
    </div>
  );
}
