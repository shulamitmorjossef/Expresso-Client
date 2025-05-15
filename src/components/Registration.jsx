import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles/Registration.css';
import baseUrl from '../config';

const Register = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      birthday: '',
      password: '',
      confirmPassword: '',
      userType: 'customer',
      managerCode: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
      birthday: Yup.date().required('Birthday is required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain an uppercase letter')
        .matches(/[^A-Za-z0-9]/, 'Must contain a symbol')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
      userType: Yup.string().required(),
      managerCode: Yup.string().when('userType', {
        is: 'manager',
        then: Yup.string().required('Manager code is required'),
      }),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${baseUrl}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error('Registration failed');

        const result = await response.json();
        console.log('Registered successfully!', result);

        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/');
        }, 3000); // 3 שניות תצוגה ואז מעבר לדף הבית
      } catch (error) {
        console.error('Registration error:', error.message);
        setErrorMessage('An error occurred during registration. Please try again.');
      }
    },
  });

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={formik.handleSubmit} className="register-form">
          <input type="text" name="fullName" placeholder="Full Name" {...formik.getFieldProps('fullName')} className="register-input" />
          {formik.touched.fullName && formik.errors.fullName && <div className="error-message">{formik.errors.fullName}</div>}

          <input type="text" name="username" placeholder="Username" {...formik.getFieldProps('username')} className="register-input" />
          {formik.touched.username && formik.errors.username && <div className="error-message">{formik.errors.username}</div>}

          <input type="email" name="email" placeholder="Email" {...formik.getFieldProps('email')} className="register-input" />
          {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}

          <input type="tel" name="phone" placeholder="Phone" {...formik.getFieldProps('phone')} className="register-input" />
          {formik.touched.phone && formik.errors.phone && <div className="error-message">{formik.errors.phone}</div>}

          <input type="date" name="birthday" {...formik.getFieldProps('birthday')} className="register-input" />
          {formik.touched.birthday && formik.errors.birthday && <div className="error-message">{formik.errors.birthday}</div>}

          <input type="password" name="password" placeholder="Password" {...formik.getFieldProps('password')} className="register-input" />
          {formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}

          <input type="password" name="confirmPassword" placeholder="Confirm Password" {...formik.getFieldProps('confirmPassword')} className="register-input" />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="error-message">{formik.errors.confirmPassword}</div>}

          <label className="radio-label">
            <input type="radio" name="userType" value="customer" checked={formik.values.userType === 'customer'} onChange={formik.handleChange} />
            Customer
          </label>
          <label className="radio-label">
            <input type="radio" name="userType" value="manager" checked={formik.values.userType === 'manager'} onChange={formik.handleChange} />
            Manager
          </label>

          {formik.values.userType === 'manager' && (
            <>
              <input type="text" name="managerCode" placeholder="Manager Code" {...formik.getFieldProps('managerCode')} className="register-input" />
              {formik.touched.managerCode && formik.errors.managerCode && <div className="error-message">{formik.errors.managerCode}</div>}
            </>
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

      <button className="back-button" onClick={() => navigate(-1)}>Back</button>

      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-message">
            ✅ Successfully registered.
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
