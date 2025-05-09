// src/components/Admin/Statistics/CustomerCount.jsx
import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../config';
import "../../styles/CustomerCount.css";

export default function CustomerCount() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleView = async () => {
    setError('');
    setCount(null);

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('Invalid date range.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${baseUrl}/customers-count`,
        { params: { startDate, endDate } }
      );
      setCount(res.data.customerCount);
    } catch (e) {
      setError(e.response?.data?.error || e.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-count-page">
      <h2>Customer Purchase Count</h2>

      <div className="filter-bar">
        <label>
          From:
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleView} disabled={loading}>
          View
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && count !== null && !error && (
        <p className="result-message">
          {count > 0
            ? `Number of purchasing customers: ${count}`
            : 'No customers purchased in selected period.'}
        </p>
      )}
    </div>
  );
}
