import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ModalMessage.css';

export default function ModalMessage({ title, message, onClose, onAction, actionText, redirectTo }) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (redirectTo) {
      navigate(redirectTo);
    } else if (onAction) {
      onAction();
    }
  };

  return (
    <div className="modal-message-overlay">
      <div className="modal-message-content">
        <button className="modal-message-close" onClick={onClose}>✖</button>
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="modal-message-action" onClick={handleAction}>
          {actionText || 'OK'}
        </button>
      </div>
    </div>
  );
}
