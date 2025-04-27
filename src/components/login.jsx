import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      setMessage(response.data.message);
      console.log('Login successful:', response.data.user);

      // כאן אפשר להפנות לדף אחר אם רוצים
      // למשל: navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response && error.response.status === 401) {
        setMessage('❌ Invalid username or password');
      } else {
        setMessage('❌ Server error. Please try again later.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button style={{ marginTop: '20px' }} type="submit">Login</button>
      </form>

      {message && (
        <div style={{ marginTop: '20px', color: message.startsWith('✅') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
