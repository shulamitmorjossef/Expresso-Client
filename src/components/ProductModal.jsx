import React from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = React.useState(1);

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="modal-body">
          <img src={product.image_path} alt={product.name} className="modal-image" />
          <div className="modal-details">
            <h2>{product.name}</h2>
            <p>Price: {product.price}₪</p>

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

            <button className="add-button" onClick={() => onAddToCart(product, quantity)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
