import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EntryPage from './components/entryPage.jsx';
import Login from './components/login.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
