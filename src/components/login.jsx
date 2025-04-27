// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const baseUrl = 'http://localhost:3000';
// // const baseUrl = 'https://exspresso-server.onrender.com';

// // עיצוב קבוע לקלטים וכפתורים
// const inputStyle = {
//   padding: '10px',
//   borderRadius: '5px',
//   border: '1px solid #ddd',
//   fontSize: '1rem',
//   width: '100%',
//   marginBottom: '1rem',
// };

// const buttonStyle = {
//   padding: '10px 20px',
//   backgroundColor: '#6F4E37',
//   color: 'white',
//   border: 'none',
//   borderRadius: '8px',
//   cursor: 'pointer',
//   fontSize: '1rem',
//   transition: 'background-color 0.3s ease',
//   marginTop: '1rem',
// };

// const formContainerStyle = {
//   maxWidth: '400px',
//   margin: '0 auto',
//   padding: '2rem',
//   border: '1px solid #eee',
//   borderRadius: '10px',
//   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//   backgroundColor: '#fafafa',
// };

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post(`${baseUrl}/login`, {
//         username,
//         password
//       });

//       console.log('Login successful:', res.data);

//       if (res.data.token) {
//         localStorage.setItem('token', res.data.token);
//       }
//       navigate('/Customer-home');
//     } catch (err) {
//       console.error('Login failed:', err);

//       if (err.response && err.response.status === 401) {
//         setError('❌ Invalid username or password');
//       } else {
//         setError('❌ Server error. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333', textAlign: 'center' }}>
//         התחברות
//       </h2>

//       <form onSubmit={handleSubmit} style={formContainerStyle}>
//         <label style={{ display: 'block', marginBottom: '0.5rem' }}>
//           שם משתמש:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             style={inputStyle}
//           />
//         </label>

//         <label style={{ display: 'block', marginBottom: '0.5rem' }}>
//           סיסמה:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={inputStyle}
//           />
//         </label>

//         <button type="submit" style={buttonStyle}>התחברות</button>

//         {error && (
//           <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
//             {error}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';
// const baseUrl = 'https://exspresso-server.onrender.com';

// עיצוב קבוע לקלטים וכפתורים
const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '1rem',
  width: '100%',
  marginBottom: '1rem',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6F4E37',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease',
  marginTop: '1rem',
};

const formContainerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '2rem',
  border: '1px solid #eee',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white', // חשוב להשאיר את הטופס עצמו לבן
  opacity: 0.95, // קצת שקוף
};

const pageStyle = {
  minHeight: '100vh',
  backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fit=crop&w=1950&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${baseUrl}/login`, {
        username,
        password
      });

      console.log('Login successful:', res.data);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
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
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={formContainerStyle}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333', textAlign: 'center' }}>
          התחברות
        </h2>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          שם משתמש:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          סיסמה:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </label>

        <button type="submit" style={buttonStyle}>התחברות</button>

        {error && (
          <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

