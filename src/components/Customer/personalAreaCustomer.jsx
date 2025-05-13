import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../config';
import '../DeliveryForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function PersonalAreaCustomer() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          setErrors({ general: 'Missing user in local storage' });
          return;
        }

        const response = await axios.get(`${baseUrl}/get-user-details/${username}`);
        if (response.data.success) {
          const user = response.data.user;
          setUser(user);
          setForm({
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: user.password
          });
        } else {
          setErrors({ general: 'Failed to fetch user data' });
        }
      } catch (err) {
        setErrors({ general: 'Error fetching user data' });
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error for this field
  };

  const validateForm = () => {
    const newErrors = {};
    const { full_name, username, email, phone, password } = form;

    // Validate full name
    if (!full_name) newErrors.full_name = 'Full name is required';

    // Validate username
    if (!username) newErrors.username = 'Username is required';

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email address';

    // Validate phone number
    const phoneRegex = /^[0-9]{9,}$/; // Make sure phone is at least 9 digits
    if (!phone) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(phone)) newErrors.phone = 'Phone must be at least 9 digits and numbers only';

    // Validate password (optional field)
    if (password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        newErrors.password = 'Password must be at least 8 characters, include an uppercase letter and a special character';
      }
    }

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess('');
      return;
    }

    const usernameFromStorage = localStorage.getItem('username');
    axios.put(`${baseUrl}/update-user-details/${usernameFromStorage}`, form)
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user);
          setEditMode(false);
          setSuccess('Details updated successfully!');
          setErrors({});
        } else {
          setErrors({ general: 'Failed to update user' });
          setSuccess('');
        }
      })
      .catch(() => {
        setErrors({ general: 'Failed to update details' });
        setSuccess('');
      });
  };

  return (
    <div className="page-with-background">
      <div className="delivery-form-container">
        <h2>My Profile</h2>

        {errors.general && <div className="error">{errors.general}</div>}
        {success && <div className="success-msg">{success}</div>}

        {['full_name', 'username', 'email', 'phone'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              className={errors[field] ? 'invalid' : ''}
              value={form[field]}
              onChange={handleChange}
              disabled={!editMode}
            />
            {errors[field] && <div className="error">{errors[field]}</div>}
          </div>
        ))}

        <div className="form-group">
          <label>Password:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={errors.password ? 'invalid' : ''}
              value={form.password}
              onChange={handleChange}
              disabled={!editMode}
            />
            {editMode && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? <FaEyeSlash size={18} color="#3c2e2a" /> : <FaEye size={18} color="#3c2e2a" />}
              </button>
            )}
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        {!editMode ? (
          <button className="submit-btn" onClick={() => setEditMode(true)}>Edit</button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="submit-btn" onClick={handleSave}>Save</button>
            <button className="submit-btn" onClick={() => {
              setEditMode(false);
              setForm(user);
              setErrors({});
              setSuccess('');
            }}>Cancel</button>
          </div>
        )}
      </div>
      <button className="back-button" onClick={() => navigate('/CustomerHome')}>
      Back
    </button>
    </div>
  );
}
