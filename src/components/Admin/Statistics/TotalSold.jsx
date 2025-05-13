import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../config'; 
import '../../styles/TotalSold.css';     
import { useNavigate } from 'react-router-dom';



export default function TotalSold() {
  const navigate = useNavigate();
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalSold, setTotalSold] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTotalSold = async () => {
    setError('');
    setTotalSold(null);

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
      const response = await axios.get(`${baseUrl}/total-sold`, {
        params: { startDate, endDate }
      });

      if (response.data && typeof response.data.totalSold === 'number') {
        setTotalSold(response.data.totalSold);
      } else {
        setError('No data returned.');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="total-sold-page">
      <h2>Total Number of Products Sold</h2>

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
        <button onClick={fetchTotalSold} disabled={loading}>
          View
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading…</p>}

      {totalSold !== null && !error && (
        <p className="total-sold-result">
          Total Units Sold: <strong>{totalSold}</strong>
        </p>
      )}
      <button className="back-button" onClick={() => navigate('/StatisticsPage')}>
      Back
    </button>
    </div>
  );
}
