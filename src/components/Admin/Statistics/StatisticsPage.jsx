import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function StatisticsPage() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">Statistical Data</h1>

      {/* Navigation Menu */}
      <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
        <Link
          to="TotalSold"
          className="px-4 py-2 rounded-2xl shadow hover:shadow-lg transition"
        >
          Total Number of Products Sold
        </Link>
        <Link
          to="/BestSellers"
          className="px-4 py-2 rounded-2xl shadow hover:shadow-lg transition"
        >
          Best Selling Products
        </Link>
        <Link
          to="CustomerCount"
          className="px-4 py-2 rounded-2xl shadow hover:shadow-lg transition"
        >
          Customer Purchase Count
        </Link>
      </nav>

      {/* Nested route content */}
      <div className="border-t pt-4">
        <Outlet />
      </div>
    </div>
  );
}
