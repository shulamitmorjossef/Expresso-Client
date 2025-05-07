import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/entryPage.css';

export default function EntryPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleRegisterClick = () => {
    navigate('/Registration');
  };

  const handleGuestClick = () => {
    navigate('/GuestHome');
  };

  return (
    <div className="entry-page">
      <h1 className="entry-title">Welcome to Expresso</h1>

      <button className="entry-button" onClick={handleGuestClick}>Guest Login</button>
      <button className="entry-button" onClick={handleLoginClick}>Login</button>
      <button className="entry-button" onClick={handleRegisterClick}>Register</button>
    </div>
  );
}