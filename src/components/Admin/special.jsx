// import React, { useState, useEffect } from 'react';
// import baseUrl from '../../config';
// import '../styles/specials.css';

// export default function PricePeriodsPage() {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [percent, setPercent] = useState('');
//   const [periods, setPeriods] = useState([]);
//   const [editId, setEditId] = useState(null);


//   const fetchPeriods = async () => {
//     const res = await fetch(`${baseUrl}/get-price-periods`);
//     const data = await res.json();
//     setPeriods(data);
//   };

// const handleDelete = async (id) => {
//   try {
//     const res = await fetch(`${baseUrl}/delete-price-period/${id}`, {
//       method: "DELETE",
//     });
//     if (res.ok) {
//       fetchPeriods(); 
//     } else {
//       console.error("Failed to delete period");
//     }
//   } catch (error) {
//     console.error("Error deleting period:", error);
//   }
// };


// const handleSubmit = async () => {
//   const url = editId
//     ? `${baseUrl}/update-price-period`
//     : `${baseUrl}/add-price-periods`;

//   const res = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       id: editId, 
//       start_date: startDate,
//       end_date: endDate,
//       percentage_change: parseFloat(percent)
//     })
//   });

//   if (res.ok) {
//     setStartDate('');
//     setEndDate('');
//     setPercent('');
//     setEditId(null);
//     fetchPeriods();
//   }
// };


//   useEffect(() => {
//     fetchPeriods();
//   }, []);

//   return (
//     <div className="price-periods-container">
//       <h2>Manage Price Periods</h2>

//       <div className="form">
//         <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//         <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//         <input type="number" value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="Percent change (e.g. -10)" />
//         <button onClick={handleSubmit}>
//         {editId ? "Update Period" : "Add Period"}
//         </button> 
//       </div>

//       <h3>Existing Periods</h3>
//       <ul>
//         {periods.map(p => (
//           <li key={p.id}>
//             <span>{p.start_date.slice(0,10)} to {p.end_date.slice(0,10)}: {p.percentage_change > 0 ? '+' : ''}{p.percentage_change}%</span>
//             <button className="delete-btn" onClick={() => {
//                 setStartDate(p.start_date.slice(0,10)); 
//                 setEndDate(p.end_date.slice(0,10));
//                 setPercent(p.percentage_change);
//                 setEditId(p.id);
//             }}>
//                 Edit
//             </button>
//             <button className="delete-btn" onClick={() => handleDelete(p.id)}>
//             Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import baseUrl from '../../config';
import '../styles/specials.css';

export default function PricePeriodsPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [percent, setPercent] = useState('');
  const [periods, setPeriods] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(''); 

  const fetchPeriods = async () => {
    const res = await fetch(`${baseUrl}/get-price-periods`);
    const data = await res.json();
    setPeriods(data);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/delete-price-period/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchPeriods(); 
      } else {
        console.error("Failed to delete period");
      }
    } catch (error) {
      console.error("Error deleting period:", error);
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate || percent === '') {
      setErrorMsg('All fields are required');
      return;
    }

    setErrorMsg(''); 

    const url = editId
      ? `${baseUrl}/update-price-period`
      : `${baseUrl}/add-price-periods`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editId, 
        start_date: startDate,
        end_date: endDate,
        percentage_change: parseFloat(percent)
      })
    });

    if (res.ok) {
      setStartDate('');
      setEndDate('');
      setPercent('');
      setEditId(null);
      fetchPeriods();
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  return (
    <div className="price-periods-container">
      <h2>Manage Price Periods</h2>

      <div className="form">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <input type="number" value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="Percent change (e.g. -10)" />
        <button onClick={handleSubmit}>
          {editId ? "Update Period" : "Add Period"}
        </button> 
      </div>

      {errorMsg && <div className="error-message">{errorMsg}</div>}

      <h3 className="existing-periods-title">Existing Periods</h3>
      <ul>
        {periods.map(p => (
          <li key={p.id}>
            
            <span>{p.start_date.slice(0,10)} to {p.end_date.slice(0,10)}: {p.percentage_change > 0 ? '+' : ''}{p.percentage_change}%</span>
            <button className="delete-btn" onClick={() => {
                setStartDate(p.start_date.slice(0,10)); 
                setEndDate(p.end_date.slice(0,10));
                setPercent(p.percentage_change);
                setEditId(p.id);
                setErrorMsg('');
            }}>
                Edit
            </button>
            <button className="delete-btn" onClick={() => handleDelete(p.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


