import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../config';
import '../styles/ManagerReviews.css';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import ModalMessage from '../ModalMessage';

export default function ManagerReviews() {
  const [reviews, setReviews] = useState([]);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get(`${baseUrl}/reviews`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          setReviews([]);
        }
      })
      .catch(() => setReviews([]));
  };

  const handleDeleteClick = (id) => {
    setModalData({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this review?",
      actionText: "Delete",
      onAction: () => handleConfirmDelete(id)
    });
  };

  const handleConfirmDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/reviews/${id}`);
      setReviews(prev => prev.filter(r => r.id !== id));
      setModalData({
        title: "Deleted",
        message: "Review deleted successfully!",
        actionText: "OK",
        onAction: () => setModalData(null)
      });
    } catch (err) {
      setModalData({
        title: "Error",
        message: "Error deleting review.",
        actionText: "Close",
        onAction: () => setModalData(null)
      });
    }
  };

  return (
    <div className="manager-reviews-page">
      <h2>Customer Reviews</h2>
      <div className="manager-reviews-list">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="manager-review-card">
              <div className="review-header">
                <strong>{rev.username || "Anonymous"}</strong>
              </div>

              <p className="review-content">"{rev.content}"</p>

              <div className="review-footer">
                <div className="review-date">
                  {new Date(rev.created_at).toLocaleDateString()}
                </div>
                <button className="delete-btn" onClick={() => handleDeleteClick(rev.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      <button className="back-button" onClick={() => navigate('/AdminHome')}>
        Back
      </button>

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          onClose={() => setModalData(null)}
          onAction={modalData.onAction}
          actionText={modalData.actionText}
        />
      )}
    </div>
  );
}
