import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EntryPage from './components/entryPage.jsx';
import Login from './components/login.jsx';
import GuestHome from './components/GuestHome.jsx';
import CustomerHome from './components/CustomerHome.jsx';
import AdminHome from './components/AdminHome.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/guest-home" element={<GuestHome />} />
      <Route path="/customer-home" element={<CustomerHome />} />
      <Route path="/admin-home" element={<AdminHome />} />
    </Routes>
  );
}

export default App;
