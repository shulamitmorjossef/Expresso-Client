import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Registration.css';

const baseUrl = 'https://exspresso-server.onrender.com';
// const baseUrl = 'http://localhost:3000/about';

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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const password = formData.password;
    const errors = [];

    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("one symbol (e.g. @, #, $, etc.)");

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

      if (!response.ok) throw new Error('Registration failed');

      const result = await response.json();
      console.log('Registered successfully!', result);
      navigate("/");
    } catch (error) {
      console.error('Registration error:', error.message);
      setErrorMessage("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="register-input" />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="register-input" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="register-input" />
          <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required className="register-input" />
          <input type="date" name="birthday" onChange={handleChange} required className="register-input" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="register-input"
            title="Password must be at least 8 characters, include one uppercase letter and one symbol." />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="register-input" />

          <label className="radio-label">
            <input type="radio" name="userType" value="customer" checked={formData.userType === 'customer'} onChange={handleChange} />
            Customer
          </label>
          <label className="radio-label">
            <input type="radio" name="userType" value="manager" checked={formData.userType === 'manager'} onChange={handleChange} />
            Manager
          </label>

          {formData.userType === 'manager' && (
            <input type="text" name="managerCode" placeholder="Manager Code" onChange={handleChange} className="register-input" />
          )}

          <div className="submit-container">
            <button
              type="submit"
              className="register-button"
              style={{ backgroundColor: isHovered ? '#5a392b' : '#6F4E37' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Register
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
