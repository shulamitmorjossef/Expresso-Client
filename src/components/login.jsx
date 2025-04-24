import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://exspresso-server.onrender.com';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${baseUrl}/login`, {
        username,
        password
      });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert('Login successful!');
        // אפשר לנתב לעמוד אחר אם רוצים:
        // window.location.href = '/home';
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      setError('Invalid username or password.');
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
      {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}
    </div>
  );
}
