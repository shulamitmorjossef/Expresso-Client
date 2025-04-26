// entryPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EntryPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/AdminHome');
  };

  const handleRegisterClick = () => {
    alert('Registration page coming soon!');
  };

  const handleGuestClick = () => {
    navigate('/guest-home'); // <-- שינוי כאן!
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100vh',
      paddingLeft: '400px',
      textAlign: 'center'
    }}>
      <div>
        <h1>Welcome to Expresso</h1>

        <button onClick={handleGuestClick}>Guest Login</button>
        <br /><br />

        <button onClick={handleLoginClick}>Login</button>
        <br /><br />

        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}
