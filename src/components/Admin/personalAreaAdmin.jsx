import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../config';
import "../styles/PersonalAreaAdmin.css";

export default function PersonalAreaAdmin() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          setError('Missing user in local storage');
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
            password: user.password,
            confirmPassword: user.password
          });
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('Error fetching user data');
      }
    };


    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSave = () => {

    if (form.password !== user.password) {
      if (!validatePassword(form.password)) {
        setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
        setSuccess('');
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.');
        setSuccess('');
        return;
      }
    }

    const hasChanges = Object.keys(form).some(
      key => key !== 'confirmPassword' && form[key] !== user[key]
    );

    if (!hasChanges) {
      setError('No changes detected.');
      setSuccess('');
      return;
    }

    const confirmed = window.confirm("Are you sure you want to update your details?");
    if (!confirmed) return;

    const username = localStorage.getItem('username');
    axios.put(`${baseUrl}/update-user-details/${username}`, form)
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user);
          setEditMode(false);
          setSuccess('Details updated successfully!');
          setError('');
        } else {
          setError('Failed to update user');
          setSuccess('');
        }
      })
      .catch(() => {
        setError('Failed to update details');
        setSuccess('');
      });
  };

  return (
    <div className="page-with-background">
      <div className="personal-area-admin">
        <h2>My Profile</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <label>
          Full Name:
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

      <label>
        New Password:
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          disabled={!editMode}
        />
      </label>

      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          disabled={!editMode}
        />
      </label>

      {!editMode ? (
        <button onClick={() => setEditMode(true)}>Edit</button>
      ) : (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => {
            setEditMode(false);
            setForm({ ...user, confirmPassword: user.password });
            setError('');
            setSuccess('');
          }}>Cancel</button>
        </>
      )}
    </div>
  );
}
