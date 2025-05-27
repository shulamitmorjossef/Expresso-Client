import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reviews.css';
import baseUrl from '../../config';

export default function ShowReviews() {
  const [reviews, setReviews] = useState([]);
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

  return (
    <div className="reviews-page">
      <h2>Reviews</h2>

      <button className="centered-button" onClick={() => navigate('/WriteReview')}>
        Write Review
      </button>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((rev, idx) => (
            <div key={idx} className="review-card">
              {rev.content}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
