import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Capsules.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';
import ProductModal from './ProductModal';
import ModalMessage from './ModalMessage';

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-capsule`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch capsules');
        return res.json();
      })
      .then((data) => setCapsules(data))
      .catch((err) => console.error('Error fetching capsules:', err));
  }, []);

  const handleAddToCart = async (item, quantity = 1) => {
    if (item.sum_of === 0) {
      setModalData({
        title: 'Out of Stock',
        message: 'Sorry, This product is out of stock.',
        onClose: () => setModalData(null),
      });
      return;
    }

    const userType = localStorage.getItem('userType');
    const userId = parseInt(localStorage.getItem('userId'));

    if (userType === 'guest' || !userType) {
      setModalData({
        title: 'Login Required',
        message: 'You must register or log in to view the cart.',
        onClose: () => {
          setModalData(null);
          navigate('/');
        },
        actionText: 'Go to Login',
      });
      return;
    }

    const productType = item.type || 'capsules';

    try {
      const res = await fetch(`${baseUrl}/add-to-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: item.id,
          quantity,
          product_type: productType
        }),
      });

      if (!res.ok) throw new Error('Server error');

      setModalData({
        title: 'Added to Cart',
        message: `Added ${quantity} x ${item.name} to your cart.`,
        onClose: () => setModalData(null)
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      setModalData({
        title: 'Error',
        message: 'Something went wrong.',
        onClose: () => setModalData(null)
      });
    }
  };

  return (
    <div className="capsules-page">
      <h1 className="capsule-title">Capsules</h1>
      <div className="capsule-list">
        {capsules.map((item) => (
          <div
            className="capsule-card"
            key={item.id}
            onClick={() => setSelectedProduct({ ...item, type: 'capsules' })}
          >
            {item.sum_of === 0 && (
              <div style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                backgroundColor: '#6f4e37',
                color: 'white',
                fontWeight: 'bold',
                padding: '4px',
                fontSize: '12px',
                textAlign: 'center',
                zIndex: 2,
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px'
              }}>
                Out of Stock
              </div>
            )}
            {item.sum_of === 1 && (
              <div style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                backgroundColor: '#6f4e37',
                color: 'white',
                fontWeight: 'bold',
                padding: '4px',
                fontSize: '12px',
                textAlign: 'center',
                zIndex: 2,
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px'
              }}>
                Last item in stock
              </div>
            )}

            <img 
            src={`data:image/jpeg;base64,${item.image}`} 
            alt={item.name} />
            <div className="capsule-details">
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart({ ...item, type: 'capsules' });
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

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          onClose={modalData.onClose}
          onAction={modalData.onAction || modalData.onClose}
          actionText={modalData.actionText}
        />
      )}
    </div>
  );
}
