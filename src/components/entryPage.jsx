import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EntryPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleRegisterClick = () => {
    alert('Registration page coming soon!');
  };

  const handleGuestClick = () => {
    navigate('/GuestHome');
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      backgroundImage: url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fit=crop&w=1950&q=80'), // רקע קפה, אפשר לשנות אם תרצי
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      backgroundRepeat: 'no-repeat'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Welcome to Expresso</h1>

      <button 
        onClick={handleGuestClick}
        style={{
          padding: '10px 20px',
          marginBottom: '1rem',
          fontSize: '1rem',
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Guest Login
      </button>

      <button 
        onClick={handleLoginClick}
        style={{
          padding: '10px 20px',
          marginBottom: '1rem',
          fontSize: '1rem',
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Login
      </button>

      <button 
        onClick={handleRegisterClick}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Register
      </button>
    </div>
  );
}



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function EntryPage() {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleRegisterClick = () => {
//     alert('Registration page coming soon!');
//   };

//   const handleGuestClick = () => {
//     // כאן אנחנו מבצעים ניתוב לדף GuestHome
//     navigate('/guest-home');
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'flex-start',
//       alignItems: 'center',
//       height: '100vh',
//       paddingLeft: '400px',
//       textAlign: 'center'
//     }}>
//       <div>
//         <h1>Welcome to Expresso</h1>

//         <button onClick={handleGuestClick}>Guest Login</button>
//         <br /><br />

//         <button onClick={handleLoginClick}>Login</button>
//         <br /><br />

//         <button onClick={handleRegisterClick}>Register</button>
//       </div>
//     </div>
//   );
// }
