import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../config';
import '../styles/ManagerReviews.css';
import { useNavigate } from 'react-router-dom';

export default function ManagerReviews() {
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
    <div className="manager-reviews-page">
      <h2>Customer Reviews</h2>
      <div className="manager-reviews-list">
        {reviews.length > 0 ? (
          reviews.map((rev, idx) => (
            <div key={idx} className="manager-review-card">
              {rev.content}
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
        <button className="back-button" onClick={() => navigate('/AdminHome')}>
          Back
        </button>
    </div>
  );
}
