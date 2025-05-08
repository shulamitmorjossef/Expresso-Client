import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../config';

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
        `${baseUrl}/statistics/customers-count`,
        {
          params: {
            startDate,
            endDate
          }
        }
      );
      setCount(res.data.customerCount);
    } catch (e) {
      setError(e.response?.data?.error || e.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-count-page" style={{ padding: 20 }}>
      <h2>Customer Purchase Count</h2>

      <div
        className="filter-bar"
        style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}
      >
        <label>
          From:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
        <label style={{ marginLeft: 24 }}>
          To:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
        <button onClick={handleView} disabled={loading} style={{ marginLeft: 24 }}>
          View
        </button>
      </div>

      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      {loading && <p>Loading...</p>}

      {!loading && count !== null && !error && (
        <p style={{ marginTop: 20 }}>
          {count > 0
            ? `Number of purchasing customers: ${count}`
            : 'No customers purchased in selected period.'}
        </p>
      )}
    </div>
  );
}
