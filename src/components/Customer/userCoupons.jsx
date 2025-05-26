import React, { useEffect, useState } from 'react';
import baseUrl from '../../config';
import '../styles/UserCoupons.css';
import { useNavigate } from 'react-router-dom';

export default function UserCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/get-user-coupons/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch coupons');
        const data = await res.json();
        setCoupons(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load coupons.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="page-with-background">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="delivery-form-container">
        <h2>My Coupons</h2>

        {loading && <p className="loading-text">Loading coupons...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && coupons.length === 0 && (
          <p className="error">You have no coupons yet.</p>
        )}

        <ul className="coupon-list">
          {coupons.map((coupon, index) => (
            <li key={index} className="coupon-item">
              <strong>{coupon.title}</strong><br />
              Code: <span className="code">{coupon.codename}</span><br />
              Discount: <span className="discount">{coupon.discount_percent || coupon.amount}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
