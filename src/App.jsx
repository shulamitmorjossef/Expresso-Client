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
      <Route path="/Login" element={<Login />} />
      <Route path="/GuestHome" element={<GuestHome />} />
      <Route path="/CustomerHome" element={<CustomerHome />} />
      <Route path="/AdminHome" element={<AdminHome />} />
      <Route path="/About" element={<About />} />
    </Routes>
  );
}

export default App;
