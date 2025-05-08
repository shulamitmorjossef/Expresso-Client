import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminOrders.css';
import baseUrl from '../../config';

export default function OrderAdminPage() {
    const [orders, setOrders] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${baseUrl}/get-all-orders`);
            setOrders(response.data);
            const initialStatuses = response.data.reduce((acc, order) => {
                acc[order.id] = order.status;
                return acc;
            }, {});
            setSelectedStatuses(initialStatuses);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(`${baseUrl}/get-order-details/${orderId}`);
            setOrderDetails(response.data.products || []);
            setSelectedOrder(orderId);
        } catch (err) {
            console.error('Error fetching order details:', err);
        }
    };

    const updateOrderStatus = async (orderId) => {
        const newStatus = selectedStatuses[orderId];
        try {
            await axios.put(`${baseUrl}/set-status-order/${orderId}`, { status: newStatus });
            alert('Order status updated successfully!');
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setOrderDetails([]);
    };

    return (
        <div className="orders-container">
            <h1>All Orders</h1>
            {orders.map(order => (
                <div key={order.id} className="order-card">
                    <h3>Order ID: {order.id}</h3>
                    <button className="info-button" onClick={() => fetchOrderDetails(order.id)}>
                        Info
                    </button>
                    <select
                        value={selectedStatuses[order.id]}
                        onChange={(e) =>
                            setSelectedStatuses({ ...selectedStatuses, [order.id]: e.target.value })
                        }
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button onClick={() => updateOrderStatus(order.id)}>Save</button>
                </div>
            ))}

            {selectedOrder && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Order Details for Order ID: {selectedOrder}</h2>
                        <ul>
                            {orderDetails.map(item => (
                                <li key={`${item.product_id}-${item.product_type}`}>
                                    {item.product_type}: {item.product_name} (ID: {item.product_id}) - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}