import React, { useState } from 'react';
import axios from 'axios';

// login.jsx
// const baseUrl = process.env.VITE_BASE_URL;
// const baseUrl = process.env.VITE_BASE_URL || 'http://localhost:3000';
// const baseUrl = import.meta.env.VITE_BASE_URL;

// const baseUrl ='http://localhost:3000';
const baseUrl ='https://exspresso-server.onrender.com';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/users`,
{
        username,
        password
      });
      alert('✅ משתמש נוצר בהצלחה!');
    } catch (err) {
      console.error('❌ שגיאה ביצירת המשתמש:', err);
      alert('🚫 יצירת המשתמש נכשלה!');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          שם משתמש:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          סיסמה:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">הירשם</button>
      </form>
    </div>
    
  );
}
