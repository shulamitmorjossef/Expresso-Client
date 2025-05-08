import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/login.css';
import baseUrl from '../config';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${baseUrl}/login`, { username, password });
      const { user_type, username: userName, id: userId, token } = res.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('username', userName);
      localStorage.setItem('userType', user_type);
      if (token) localStorage.setItem('token', token);

      if (user_type === 'manager') navigate('/AdminHome');
      else if (user_type === 'customer') navigate('/CustomerHome');
      else setError('Unknown user type');
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Invalid username or password'
          : 'Server error. Please try again later.'
      );
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');

    try {
      await axios.post(`${baseUrl}/reset-password`, { email: resetEmail });
      setResetMessage(
        'Reset link sent to your email.\nIf you did not receive it, please check your spam'
      );
    } catch (err) {
      if (err.response?.status === 404) {
        setResetMessage('Email not found in the system.');
      } else {
        setResetMessage('Server error. Try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>

        <label className="login-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
        </label>

        <label className="login-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>

        <div className="reset-password-link">
          <span>Forgot your password? </span>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="reset-password-button"
          >
            Reset Password
          </button>
        </div>

        <button type="submit" className="login-button">Login</button>
        {error && <div className="login-error">{error}</div>}
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reset Your Password</h3>
            <form onSubmit={handleResetPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="login-input"
                required
              />
              <button type="submit" className="login-button">Send Link</button>
            </form>
            {resetMessage && <p>{resetMessage}</p>}
            <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
