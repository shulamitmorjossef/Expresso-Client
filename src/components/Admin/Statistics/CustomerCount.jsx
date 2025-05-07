import React, { useState } from 'react';

export default function CustomerCount() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [count, setCount]         = useState(null);

  const handleView = async () => {
    // TODO: קריאת API ל־/api/statistics/customers-count?startDate=...&endDate=...
    // const res = await fetch(...);
    // const data = await res.json();
    // setCount(data.customerCount);
    setCount(42); // דוגמה
  };

  return (
    <div>
      <h2>Customer Purchase Count</h2>
      <div>
        <label>From: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
        <label style={{ marginLeft: 20 }}>To: <input type="date" value={endDate}   onChange={e => setEndDate(e.target.value)} /></label>
        <button onClick={handleView} style={{ marginLeft: 20 }}>View</button>
      </div>
      {count !== null && (
        <p style={{ marginTop: 20 }}>Customers who purchased at least once: <strong>{count}</strong></p>
      )}
    </div>
  );
}
