import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://exspresso-server.onrender.com';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    birthday: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    managerCode: '',
    uniqueCode: '',
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Password match check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // 2. Password strength check with detailed alert
    const password = formData.password;
    const errors = [];

    if (password.length < 8) {
      errors.push("at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("one uppercase letter");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("one symbol (e.g. @, #, $, etc.)");
    }

    if (errors.length > 0) {
      alert("Password must contain:\n- " + errors.join("\n- "));
      return;
    }

    try {
      const responseEmail = await fetch(`${baseUrl}/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const responsePhone = await fetch(`${baseUrl}/check-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });

      const emailResult = await responseEmail.json();
      const phoneResult = await responsePhone.json();

      if (emailResult.exists || phoneResult.exists) {
        setErrorMessage("Email or phone number already exists.");
        return;
      }

      const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log('Registered successfully!', result);
      navigate("/");
    } catch (error) {
      console.error('Registration error:', error.message);
      setErrorMessage("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1470&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: '"Arial", sans-serif',
      backdropFilter: 'brightness(0.7)'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(5px)',
        width: '100%',
        maxWidth: '800px'
      }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333', textAlign: 'center' }}>Register</h2>
        <form onSubmit={handleSubmit} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          width: '100%',
        }}>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required style={inputStyle} />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
          <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required style={inputStyle} />
          <input type="date" name="birthday" onChange={handleChange} required style={inputStyle} />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={inputStyle}
            title="Password must be at least 8 characters, include one uppercase letter and one symbol."
          />

          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required style={inputStyle} />

          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              name="userType"
              value="customer"
              checked={formData.userType === 'customer'}
              onChange={handleChange}
              style={{ marginRight: '10px' }}
            />
            Customer
          </label>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              name="userType"
              value="manager"
              checked={formData.userType === 'manager'}
              onChange={handleChange}
              style={{ marginRight: '10px' }}
            />
            Manager
          </label>

          {formData.userType === 'manager' && (
            <input
              type="text"
              name="managerCode"
              placeholder="Manager Code"
              onChange={handleChange}
              style={inputStyle}
            />
          )}

          <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: isHovered ? '#5a392b' : '#6F4E37',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Register
            </button>
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '1rem',
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
};

export default Register;
