import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EntryPage from './components/entryPage.jsx';
import Login from './components/login.jsx';
import GuestHome from './components/GuestHome.jsx';
import CustomerHome from './components/CustomerHome.jsx';
import AdminHome from './components/AdminHome.jsx';
import About from './components/About.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/guest-home" element={<GuestHome />} />
      <Route path="/Customer-home" element={<CustomerHome />} />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
