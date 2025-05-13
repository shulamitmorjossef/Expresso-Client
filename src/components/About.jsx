// src/components/About.jsx

import React, { useEffect, useState } from 'react';
import './styles/About.css';

import baseUrl from '../config';
import { useNavigate } from 'react-router-dom';



// const baseUrl = process.env.SERVER_URL ; 
// const baseUrl = import.meta.env.VITE_SERVER_URL;

function About() {
  const navigate = useNavigate();

  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(() => {

    fetch(`${baseUrl}/about`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch About content');
        }
        return response.json();
      })
      .then((data) => setAboutData(data))
      .catch((err) => {
        console.error('Error loading About content', err);
        setError('Failed to load content.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!aboutData) {
    return <div>Loading About...</div>;
  }

  return (
    <div className="about-page">
      <h1>{aboutData.title}</h1>
      <p>{aboutData.section1}</p>
      <p>{aboutData.section2}</p>
      <p>{aboutData.section3}</p>
      <p>{aboutData.section4}</p>
      <p>{aboutData.section5}</p>
      <button className="back-button" onClick={() => navigate(-1)}>
      Back
     </button>
    </div>
  );
}

export default About;
