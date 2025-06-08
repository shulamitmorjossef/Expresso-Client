import React from 'react';
import "../ProductModal.css";

export default function InventoryModal({ product, onClose, onUpdateStock }) {
  const [stock, setStock] = React.useState(product.sum_of ?? 0);
  const [message, setMessage] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  if (!product) return null;

  const handleUpdate = async () => {
    try {
      await onUpdateStock(product.id, stock, product.type);
      setMessage("Stock updated successfully.");
      setIsError(false);
      setTimeout(onClose, 1500);
    } catch (err) {
      setMessage("Failed to update stock.");
      setIsError(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="modal-body">

          <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="modal-image" />
          <div className="modal-details">
            <h2>{product.name}</h2>
            <p>Price: {product.price} ₪</p>

            {product.type === 'coffee_machine' && (
              <>
                <p>Color: {product.color}</p>
                <p>Capacity: {product.capacity}ml</p>
              </>
            )}
            {product.type === 'capsule' && (
              <>
                <p>Flavor: {product.flavor}</p>
                <p>Quantity per package: {product.quantity_per_package}</p>
                <p>Net weight: {product.net_weight_grams}g</p>
                <p>Ingredients: {product.ingredients}</p>
              </>
            )}
            {product.type === 'milk_frother' && (
              <>
                <p>Color: {product.color}</p>
                <p>Frothing type: {product.frothing_type}</p>
                <p>Capacity: {product.capacity}ml</p>
              </>
            )}

            <div className="quantity-section">
              <button onClick={() => setStock(s => Math.max(0, s - 1))}>-</button>
              <span>{stock}</span>
              <button onClick={() => setStock(s => s + 1)}>+</button>
            </div>

            <button className="add-button" onClick={handleUpdate}>
              Update Stock
            </button>

            {message && (
              <p style={{
                marginTop: '10px',
                fontWeight: 'bold',
                color: isError ? 'red' : 'green'
              }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}