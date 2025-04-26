import React from 'react';

export default function HomeCustomer() {
  return (
    <div>
      <header style={{ textAlign: 'right', padding: '10px' }}>
        <button>Menu</button>
        <div>
          <ul>
            <li>Edit Account Details</li>
            <li>My Orders</li>
            <li>Shopping Cart</li>
            <li>Coupons</li>
            <li>Reviews</li>
          </ul>
        </div>
      </header>

      <main style={{ textAlign: 'center' }}>
        <input type="text" placeholder="Search..." />
        <h2>Categories</h2>
        <div>
          <img src="/images/coffee.png" alt="Coffee Machines" width="150" />
          <img src="/images/capsules.png" alt="Capsules" width="150" />
          <img src="/images/accessories.png" alt="Accessories" width="150" />
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <a href="#">Terms & Conditions</a>
      </footer>
    </div>
  );
}
