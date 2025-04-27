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

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${baseUrl}/users`,
{
        username,
        password
      });

<<<<<<< HEAD
      setMessage(response.data.message);
      console.log('Login successful:', response.data.user);

      // כאן אפשר להפנות לדף אחר אם רוצים
      // למשל: navigate('/home');
      navigate('/CustomerHome');
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response && error.response.status === 401) {
        setMessage('❌ Invalid username or password');
      } else {
        setMessage('❌ Server error. Please try again later.');
      }
    }
=======
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert('Login successful!');
        
        } else {
        setError('Login failed: No token received.');
        }
      // alert('✅ משתמש נוצר בהצלחה!');
    // } catch (err) {
      // console.error('❌ שגיאה ביצירת המשתמש:', err);
      // alert('🚫 יצירת המשתמש נכשלה!');
    // }
  // };
} catch (err) {
  setError('Invalid username or password.');
  }
>>>>>>> f28b0a37bfbfbdee712a858861c0ff597f976eab
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    
