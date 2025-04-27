import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // נוסיף את זה לניווט
import axios from 'axios';

const baseUrl = 'http://localhost:3000';
// const baseUrl = 'https://exspresso-server.onrender.com';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // מוסיפים את הניווט

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${baseUrl}/login`, {
        username,
        password
      });

      console.log('Login successful:', res.data);
      // שמירת טוקן אם יש
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      // מעבר לעמוד הבית
      navigate('/customer-home');
    } catch (err) {
      console.error('Login failed:', err);

      if (err.response && err.response.status === 401) {
        setError('❌ Invalid username or password');
      } else {
        setError('❌ Server error. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
}
