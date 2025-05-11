import React, { useState } from 'react';
import './ProductModal.css';
import ModalMessage from './ModalMessage'; 

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [modalData, setModalData] = useState(null);

  if (!product) return null;

  const handleAddToCartClick = () => {
    if (product.sum_of === 0) {
      setModalData({
        title: 'Out of Stock',
        message: 'Sorry, this product is out of stock.',
        actionText: 'OK',
        onAction: () => setModalData(null),
      });
      return;
    }

    onAddToCart(product, quantity);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="modal-body">
          <img src={product.image_path} alt={product.name} className="modal-image" />
          <div className="modal-details">
            <h2>{product.name}</h2>
            <p>Price: {product.price}$</p>

            {product.type === 'coffee_machine' && (
              <>
                <p>Color: {product.color}</p>
                <p>Capacity: {product.capacity} cups</p>
              </>
            )}
            {product.type === 'capsule' && (
              <>
                <p>Flavor: {product.flavor}</p>
                <p>Quantity: {product.quantity_per_package}</p>
                <p>Weight: {product.net_weight_grams}g</p>
              </>
            )}
            {product.type === 'milk_frother' && (
              <>
                <p>Color: {product.color}</p>
                <p>Frothing Type: {product.frothing_type}</p>
                <p>Capacity: {product.capacity}ml</p>
              </>
            )}

            <div className="quantity-section">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button className="add-button" onClick={handleAddToCartClick}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          actionText={modalData.actionText}
          onAction={modalData.onAction}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
}
