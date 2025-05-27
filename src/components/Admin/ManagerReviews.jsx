import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../config';
import '../styles/ManagerReviews.css';

export default function ManagerReviews() {
  const [reviews, setReviews] = useState([]);

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
    </div>
  );
}
