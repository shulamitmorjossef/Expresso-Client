import React, { useState } from 'react';

export default function TotalSold() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]   = useState('');
  const [total, setTotal]       = useState(null);

  const handleView = async () => {
    // TODO: קריאת API ל־/api/statistics/total-sold?startDate=...&endDate=...
    // לדוגמא:
    // const res = await fetch(`/api/statistics/total-sold?startDate=${startDate}&endDate=${endDate}`);
    // const data = await res.json();
    // setTotal(data.totalSold);
    setTotal(1234); // רק לדוגמא
  };

  return (
    <div>
      <h2>Total Number of Products Sold</h2>
      <div>
        <label>From: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
        <label style={{ marginLeft: 20 }}>To: <input type="date" value={endDate}   onChange={e => setEndDate(e.target.value)} /></label>
        <button onClick={handleView} style={{ marginLeft: 20 }}>View</button>
      </div>
      {total !== null && (
        <p style={{ marginTop: 20 }}>Total sold: <strong>{total}</strong> units</p>
      )}
    </div>
  );
}
