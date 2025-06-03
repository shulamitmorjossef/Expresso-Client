import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reviews.css';
import baseUrl from '../../config';
import ModalMessage from '../ModalMessage';

export default function WriteReview() {
  const [reviewText, setReviewText] = useState('');
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
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
  }, []);

  const handleSend = async () => {
    if (!reviewText.trim()) return;

    const username = localStorage.getItem('username');
    try {
      await axios.post(`${baseUrl}/reviews`, { 
        content: reviewText,
        username: username
      });
      setModalData({
        title: "Success",
        message: "Your review has been submitted successfully!",
        actionText: "OK",
        onAction: () => {
          setModalData(null);
          navigate('/ShowReviews');
        }
      });
    } catch (err) {
      console.error(err);
      setModalData({
        title: "Error",
        message: "Something went wrong while sending the review.",
        actionText: "Close",
        onAction: () => setModalData(null)
      });
    }
  };

  return (
    <>
      <div className="write-review-page">
        <div className="review-form-card">
          <h3>Enter your review:</h3>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your review - choose your words wisely :)"
          />
          <button onClick={handleSend}>Send Review</button>
        </div>
      </div>

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          onClose={modalData.onAction}
          onAction={modalData.onAction}
          actionText={modalData.actionText}
        />
      )}
    </>
  );
}
