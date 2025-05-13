import {
    User,
    List,
    Package,
    Truck,
    BarChart,
    Star,
    Percent,
    FileText,
    LogOut
  } from 'lucide-react';
  import { Link } from 'react-router-dom';
  import '../styles/AdminNavbar.css';
  
  export default function AdminNavbar() {
    return (
      <header className="admin-navbar">
        <nav>
          <ul>
            <li><Link to="/PersonalAreaAdmin"><User size={16} /> Edit Account</Link></li>
            <li><Link to="/OrderAdminPage"><List size={16} /> Orders</Link></li>
            <li><Link to="/CatalogPage"><Package size={16} /> Catalog</Link></li>
            <li><Link to="/DeliveryDays"><Truck size={16} /> Delivery</Link></li>
            <li><Link to="/StatisticsPage"><BarChart size={16} /> Statistics</Link></li>
            <li><Link to="/CustomerCount"><Star size={16} /> Customers</Link></li>
            <li><Link to="/CouponsPage"><Percent size={16} /> Coupons</Link></li>
            <li><Link to="/EditTerms"><FileText size={16} /> Terms</Link></li>
            <li><Link to="/"><LogOut size={16} /> Logout</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
  