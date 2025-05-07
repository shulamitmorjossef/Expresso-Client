import React from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={product.image_path} alt={product.name} className="modal-img" />
        <h2>{product.name}</h2>
        <p><strong>Type:</strong> {product.type}</p>
        <p><strong>Price:</strong> {product.price}₪</p>
      </div>
    </div>
  );
}
