import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reviews.css';
import baseUrl from '../../config';
import ModalMessage from '../ModalMessage'; 

export default function ShowReviews() {
  const [reviews, setReviews] = useState([]);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/reviews`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          setReviews([]);
        }
      })
      .catch(() => setReviews([]));
  }, []);

  const handleWriteReviewClick = () => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/WriteReview');
    } else {
      setModalData({
        title: "Login Required",
        message: "You must be logged in to write a review.",
        actionText: "Go to Login",
        onAction: () => {
          setModalData(null);
          navigate('/Login');
        }
      });
    }
  };

  return (
    <div className="reviews-page">
      <h2>Reviews</h2>

      <button className="centered-button" onClick={handleWriteReviewClick}>
        Write Review
      </button>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((rev, idx) => (
            <div key={idx} className="review-card">
              <div className="review-header">
                <strong>{rev.username || "Anonymous"}</strong>
              </div>
              <p className="review-content">"{rev.content}"</p>
              <div className="review-date">
                {new Date(rev.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first!</p>
        )}
      </div>

      <button className="back-button" onClick={() => navigate('/CustomerHome')}>
        Back
      </button>

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          onClose={modalData.onAction}
          onAction={modalData.onAction}
          actionText={modalData.actionText}
        />
      )}
    </div>
  );
}
