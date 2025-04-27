// src/components/About.jsx

import React, { useEffect, useState } from 'react';
import './About.css'; // אם יש לך עיצוב

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(() => {

    fetch('https://exspresso-server.onrender.com/about')  // 
    // fetch('http://localhost:3000/about')  // 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch About content');
        }
        return response.json();
      })
      .then((data) => setAboutData(data))
      .catch((err) => {
        console.error('❌ Error loading About content', err);
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
    </div>
  );
}

export default About;
