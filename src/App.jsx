import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EntryPage from './components/entryPage.jsx';
import Login from './components/login.jsx';
import GuestHome from './components/GuestHome.jsx';
import CustomerHome from './components/Customer/CustomerHome.jsx';
import AdminHome from './components/Admin/AdminHome.jsx';
import About from './components/About.jsx';
import Registration  from './components/Registration.jsx';
import Terms from './components/Terms.jsx';
import PersonalAreaAdmin from './components/Admin/personalAreaAdmin.jsx';
import PersonalAreaCustomer from './components/Customer/personalAreaCustomer.jsx';
import EditTerms from './components/Admin/editTerms.jsx';
import DeliveryDays from './components/Admin/deliveryDays.jsx';
import CoffeeProducts from './components/CoffeeProducts.jsx';
import MilkFrothers from './components/MilkFrothers.jsx';
import Capsules from './components/Capsules.jsx';
import CatalogPage from './components/Admin/CatalogPage.jsx';
import CapsuleCatalog from './components/Admin/CapsuleCatalog.jsx';
import CoffeeCatalog from './components/Admin/CoffeeCatalog.jsx';
import FrotherCatalog from './components/Admin/FrotherCatalog.jsx';



function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/GuestHome" element={<GuestHome />} />
      <Route path="/CustomerHome" element={<CustomerHome />} />
      <Route path="/AdminHome" element={<AdminHome />} />
      <Route path="/About" element={<About />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/Terms" element={<Terms />} />
      <Route path="/PersonalAreaAdmin" element={<PersonalAreaAdmin />} />
      <Route path="/PersonalAreaCustomer" element={<PersonalAreaCustomer />} />
      <Route path="/EditTerms" element={<EditTerms />} />
      <Route path="/DeliveryDays" element={<DeliveryDays />} />
      <Route path="/CoffeeProducts" element={<CoffeeProducts />} />
      <Route path="/MilkFrothers" element={<MilkFrothers />} />
      <Route path="/Capsules" element={<Capsules />} />
      <Route path="/CatalogPage" element={<CatalogPage />} />
      <Route path="/CapsuleCatalog" element={<CapsuleCatalog />} />
      <Route path="/CoffeeCatalog" element={<CoffeeCatalog />} />
      <Route path="/FrotherCatalog" element={<FrotherCatalog />} />

      {/* Add other routes here */}

    </Routes>
  );
}

export default App;
