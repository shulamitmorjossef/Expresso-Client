import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../config';
import '../styles/editTerms.css';  

export default function EditTerms() {
  const [terms, setTerms] = useState({
    title: '',
    section1: '',
    section2: '',
    section3: '',
    section4: '',
    section5: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the terms from the server on component mount
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${baseUrl}/terms`);
        if (response.data) {
          setTerms(response.data);
        } else {
          setError('Failed to fetch terms');
        }
      } catch (err) {
        console.error('Error fetching terms:', err);
        setError('Error fetching terms');
      }
    };

    fetchTerms();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setTerms({ ...terms, [e.target.name]: e.target.value });
  };

  // Save the updated terms
  const handleSave = async () => {
    try {
      const response = await axios.put(`${baseUrl}/terms`, terms);
      if (response.data.success) {
        setSuccess('Terms updated successfully!');
        setEditMode(false);
        setError('');
      } else {
        setError('Failed to update terms');
        setSuccess('');
      }
    } catch (err) {
      console.error('Error updating terms:', err);
      setError('Failed to update terms');
      setSuccess('');
    }
  };

  return (
    <div className="terms-edit">
      <h2>Edit Terms</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={terms.title}
          onChange={handleChange}
          disabled={!editMode}
        />
      </label>

      {[1, 2, 3, 4, 5].map((num) => (
        <label key={num}>
          Section {num}:
          <textarea
            name={`section${num}`}
            value={terms[`section${num}`]}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>
      ))}

      {!editMode ? (
        <button onClick={() => setEditMode(true)}>Edit</button>
      ) : (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}
