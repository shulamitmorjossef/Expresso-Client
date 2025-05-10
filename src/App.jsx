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
import EditCoffeeMachine from './components/Admin/EditCoffeeMachine.jsx';
import TotalSold from './components/Admin/Statistics/TotalSold.jsx';
import BestSellers from './components/Admin/Statistics/BestSellers.jsx';
import CustomerCount from './components/Admin/Statistics/CustomerCount.jsx';
import StatisticsPage from './components/Admin/Statistics/StatisticsPage.jsx';
import EditCapsule from './components/Admin/EditCapsule.jsx'; 
import EditFrother from './components/Admin/EditFrother'; 
import AddCapsule from './components/Admin/AddCapsule.jsx';
import AddCoffeeMachine from './components/Admin/AddCoffeeMachine.jsx';
import AddFrother from './components/Admin/AddFrother.jsx';
import CartPage from './components/CartPage';
import DeliveryForm from './components/DeliveryForm';
import PaymentForm from './components/PaymentForm';
import OrderAdminPage from './components/Admin/ordersAdminPage.jsx';
import CouponsPage from './components/Admin/couponsPage.jsx';
import MyOrders from './components//Customer/MyOrders';






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
      <Route path="/EditCoffeeMachine/:id" element={<EditCoffeeMachine />} />
      <Route path="/TotalSold" element={<TotalSold />} />
      <Route path="/BestSellers" element={<BestSellers />} />
      <Route path="/CustomerCount" element={<CustomerCount />} />
      <Route path="/StatisticsPage" element={<StatisticsPage />} />
      <Route path="/EditCapsule/:id" element={<EditCapsule />} />
      <Route path="/EditFrother/:id" element={<EditFrother />} />
      <Route path="/AddCapsule" element={<AddCapsule />} />
      <Route path="/AddCoffeeMachine" element={<AddCoffeeMachine />} />
      <Route path="/AddFrother" element={<AddFrother />} />
      <Route path="/CartPage" element={<CartPage />} />
      <Route path="/DeliveryForm" element={<DeliveryForm />} />
      <Route path="/Payment" element={<PaymentForm />} />
      <Route path="/OrderAdminPage" element={<OrderAdminPage />} />
      <Route path="/CouponsPage" element={<CouponsPage />} />
      <Route path="/MyOrders" element={<MyOrders />} />



    </Routes>
  );
}

export default App;