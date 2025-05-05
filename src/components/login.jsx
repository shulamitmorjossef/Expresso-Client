import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/login.css';


import baseUrl from '../config';


// const baseUrl = 'https://exspresso-server.onrender.com';
// const baseUrl = 'http://localhost:3000';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${baseUrl}/login`, { username, password });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      navigate('/CustomerHome');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('❌ Invalid username or password');
      } else {
        setError('❌ Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">login</h2>

        <label className="login-label">
          user name:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
        </label>

        <label className="login-label">
          password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>

        <button type="submit" className="login-button">Login</button>

        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}
