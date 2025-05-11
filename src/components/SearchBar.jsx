import React, { useState } from 'react';
import './SearchBar.css';
import baseUrl from '../config';
import ModalMessage from './ModalMessage'; 

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [modalData, setModalData] = useState(null); 

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
        setModalData(null); 
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      console.error('Error during fetch:', err);
      setModalData({
        title: 'Search Error',
        message: 'Something went wrong while searching. Please try again.',
        onClose: () => setModalData(null),
      });
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

      <ul className="search-results">
        {results.map((item, idx) => (
          <li key={idx}>
            <img src={item.image_path} alt={item.name} width="50" />
            <strong>{item.name}</strong> - {item.price}₪ <em>({item.type})</em>
          </li>
        ))}
      </ul>

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          onClose={modalData.onClose}
          onAction={modalData.onAction || modalData.onClose}
          actionText={modalData.actionText}
        />
      )}
    </div>
  );
}
