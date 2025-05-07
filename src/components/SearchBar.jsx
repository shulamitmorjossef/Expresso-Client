import React, { useState } from 'react';
import './SearchBar.css';
import baseUrl from '../config';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/search-products?query=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
        setError('');
      } else {
        setError('Unexpected response');
      }
    } catch (err) {
      console.error('❌ Error during fetch:', err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      <ul className="search-results">
        {results.map((item, idx) => (
          <li key={idx}>
            <img src={item.image_path} alt={item.name} width="50" />
            <strong>{item.name}</strong> - {item.price}₪ <em>({item.type})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
