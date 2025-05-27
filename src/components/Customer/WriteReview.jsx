import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reviews.css';
import baseUrl from '../../config';

export default function WriteReview() {
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();

  const handleSend = async () => {
    console.log('env mode:', import.meta.env.MODE);
    console.log('baseUrl:', baseUrl);
    console.log('Full URL:', `${baseUrl}/reviews`);
    if (!reviewText.trim()) return;
    try {
      await axios.post(`${baseUrl}/reviews`, { content: reviewText });
      alert("Review sent!");
      navigate('/ShowReviews');
    } catch (err) {
      console.error(err);
      alert("Something went wrong while sending the review.");
    }
  };

  return (
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
  );
}
