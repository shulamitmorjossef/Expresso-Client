import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import "../../styles/StatisticsPage.css";
import { useNavigate } from 'react-router-dom';



export default function StatisticsPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="statistics-page">
      <h1 className="statistics-page__title">Statistical Data</h1>

      <nav className="statistics-page__nav">
        <Link
          to="/TotalSold"
          className={
            'statistics-page__link' +
            (pathname === '/TotalSold' ? ' statistics-page__link--active' : '')
          }
        >
          Total Number of Products Sold
        </Link>
        <Link
          to="/BestSellers"
          className={
            'statistics-page__link' +
            (pathname === '/BestSellers' ? ' statistics-page__link--active' : '')
          }
        >
          Best Selling Products
        </Link>
        <Link
          to="/CustomerCount"
          className={
            'statistics-page__link' +
            (pathname === '/CustomerCount' ? ' statistics-page__link--active' : '')
          }
        >
          Customer Purchase Count
        </Link>
      </nav>

      <div className="statistics-page__content">
        <Outlet />
      </div>
      <button className="back-button" onClick={() => navigate('/AdminHome')}>
      Back
    </button>
    </div>
  );
}
