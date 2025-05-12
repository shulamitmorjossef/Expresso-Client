import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../config';       
import '../../styles/BestSellers.css';     

export default function BestSellers() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBestSellers = async () => {
    setError('');
    setResults([]);

    if (!startDate || !endDate) {
      setError('Please select both dates.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('Invalid date range.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/best-sellers`,
        { params: { startDate, endDate } }
      );

      if (response.data.message) {
        setError(response.data.message);
      } else {
        setResults(response.data);
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="best-sellers-page">
      <h2>Best Selling Products</h2>

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
        <button onClick={fetchBestSellers} disabled={loading}>
          View
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading…</p>}

      {results.length > 0 && (
        <ul className="results-list">
          {results.map((p, idx) => (
            <li key={idx} className="result-item">
              {p.image_path &&
                <img
                  src={p.image_path}
                  alt={p.name}
                  className="product-thumb"
                />
              }
              <div className="product-info">
                <span className="units-sold">{p.total_sold}</span>
                <span className="product-name">{p.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
