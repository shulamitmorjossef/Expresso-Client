import React, { useEffect, useState } from 'react';
import './styles/Terms.css';

import baseUrl from '../config';


export default function Terms() {
  const [terms, setTerms] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/terms`)

      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Terms content');
        }
        return response.json();
      })
      .then((data) => setTerms(data))
      .catch((err) => {
        console.error('Error loading Terms content', err);
        setError('Failed to load content.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!terms) {
    return <div>Loading Terms...</div>;
  }

  return (
    <div className="terms-page">
      <h1>{terms.title}</h1>
      <p>{terms.section1}</p>
      <p>{terms.section2}</p>
      <p>{terms.section3}</p>
      <p>{terms.section4}</p>
      <p>{terms.section5}</p>
    </div>
  );
}
