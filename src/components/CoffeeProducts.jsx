// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './styles/CoffeeProducts.css';
// import { FaShoppingCart } from 'react-icons/fa';
// import baseUrl from '../config';
// import ProductModal from './ProductModal';
// import ModalMessage from '../components/ModalMessage';

// export default function CoffeeProducts() {
//   const [machines, setMachines] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalData, setModalData] = useState(null); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${baseUrl}/get-all-coffee-machines`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch coffee machines");
//         return res.json();
//       })
//       .then((data) => setMachines(data))
//       .catch((err) => {
//         console.error('Error:', err);
//       });
//   }, []);

//   const handleAddToCart = async (item, quantity = 1) => {
//     if (item.sum_of === 0) {
//       setModalData({
//         title: 'Out of Stock',
//         message: 'Sorry, this product is out of stock.',
//         onClose: () => setModalData(null),
//       });
//       return;
//     }

//     const userType = localStorage.getItem('userType');
//     const userId = parseInt(localStorage.getItem('userId'));

//     if (userType === 'guest' || !userType) {
//       setModalData({
//         title: 'Login Required',
//         message: 'You must register or log in to view the cart.',
//         onClose: () => {
//           setModalData(null);
//           navigate('/');
//         },
//         actionText: 'Go to Login',
//       });
//       return;
//     }

//     const rawType = item.type ||
//       (item.capacity && item.frothing_type ? 'milk_frothers' :
//        item.capacity ? 'coffee_machines' :
//        item.flavor ? 'capsules' : 'unknown');

//     try {
//       const res = await fetch(`${baseUrl}/add-to-cart`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user_id: userId,
//           product_id: item.id,
//           quantity,
//           product_type: rawType
//         }),
//       });

//       if (!res.ok) throw new Error('Server error');

//       setModalData({
//         title: 'Added to Cart',
//         message: `Added ${quantity} x ${item.name} to your cart.`,
//         onClose: () => setModalData(null)
//       });
//     } catch (err) {
//       console.error('Error adding to cart:', err);
//       setModalData({
//         title: 'Error',
//         message: 'Something went wrong while adding to cart.',
//         onClose: () => setModalData(null)
//       });
//     }
//   };

//   return (
//     <div className="products-page">
//       <h1 className="Coffee-title">Coffee Machines</h1>
//       <div className="product-list">
//         {machines.map((machine) => (
//           <div
//             key={machine.id}
//             className="product-card"
//             onClick={() => setSelectedProduct({ ...machine, type: 'coffee_machines' })}
//             style={{ position: 'relative' }}
//           >
//             {machine.sum_of === 0 && (
//               <div style={{
//                 position: 'absolute',
//                 top: 0,
//                 width: '100%',
//                 backgroundColor: '#6f4e37',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 padding: '4px',
//                 fontSize: '12px',
//                 textAlign: 'center',
//                 zIndex: 2,
//                 borderTopLeftRadius: '12px',
//                 borderTopRightRadius: '12px'
//               }}>
//                 Out of Stock
//               </div>
//             )}
//             {machine.sum_of === 1 && (
//               <div style={{
//                 position: 'absolute',
//                 top: 0,
//                 width: '100%',
//                 backgroundColor: '#6f4e37',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 padding: '4px',
//                 fontSize: '12px',
//                 textAlign: 'center',
//                 zIndex: 2,
//                 borderTopLeftRadius: '12px',
//                 borderTopRightRadius: '12px'
//               }}>
//                 Last item in stock
//               </div>
//             )}

//             <img 
//               src={`data:image/jpeg;base64,${machine.image}`} 
//               alt={machine.name} />
//             <div className="product-details">
//               <h3>{machine.name}</h3>
//               <p>${parseFloat(machine.price).toFixed(2)}</p>

//               <button
//                 className="add-to-cart-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleAddToCart({ ...machine, type: 'coffee_machines' });
//                 }}
//               >
//                 <FaShoppingCart />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           onAddToCart={(product, quantity) => {
//             handleAddToCart(product, quantity);
//             setSelectedProduct(null);
//           }}
//         />
//       )}

//       {modalData && (
//         <ModalMessage
//           title={modalData.title}
//           message={modalData.message}
//           onClose={modalData.onClose}
//           onAction={modalData.onAction || modalData.onClose}
//           actionText={modalData.actionText}
//         />
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CoffeeProducts.css';
import { FaShoppingCart } from 'react-icons/fa';
import baseUrl from '../config';
import ProductModal from './ProductModal';
import ModalMessage from '../components/ModalMessage';

export default function CoffeeProducts() {
  const [machines, setMachines] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalData, setModalData] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/get-all-coffee-machines`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch coffee machines");
        return res.json();
      })
      .then((data) => setMachines(data))
      .catch((err) => {
        console.error('Error:', err);
      });
  }, []);

  const handleAddToCart = async (item, quantity = 1) => {
    if (item.sum_of === 0) {
      setModalData({
        title: 'Out of Stock',
        message: 'Sorry, this product is out of stock.',
        onClose: () => setModalData(null),
      });
      return;
    }

    const userType = localStorage.getItem('userType');
    const userId = parseInt(localStorage.getItem('userId'));

    if (userType === 'guest' || !userType) {
      setModalData({
        title: 'Login Required',
        message: 'You must register or log in to view the cart.',
        onClose: () => {
          setModalData(null);
          navigate('/');
        },
        actionText: 'Go to Login',
      });
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/add-to-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: item.id,
          quantity,
          product_type: 'coffee_machines'
        }),
      });

      if (!res.ok) throw new Error('Server error');

      setModalData({
        title: 'Added to Cart',
        message: `Added ${quantity} x ${item.name} to your cart.`,
        onClose: () => setModalData(null)
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      setModalData({
        title: 'Error',
        message: 'Something went wrong while adding to cart.',
        onClose: () => setModalData(null)
      });
    }
  };

  const handleSort = async (type) => {
    if (type === 'asc') {
      const sorted = [...machines].sort((a, b) => a.price - b.price);
      setMachines(sorted);
    } else if (type === 'desc') {
      const sorted = [...machines].sort((a, b) => b.price - a.price);
      setMachines(sorted);
    } else if (type === 'popularity') {
      try {
        const res = await fetch(`${baseUrl}/coffee-machines-by-popularity`);
        if (!res.ok) throw new Error('Failed to fetch coffee machines by popularity');
        const data = await res.json();
        setMachines(data);
      } catch (err) {
        console.error('Error sorting by popularity:', err);
      }
    }
  };

  return (
    <div className="products-page">
      <h1 className="Coffee-title">Coffee Machines</h1>

      <div className="sort-controls">
        <button className="sort-button" onClick={() => handleSort('asc')}>
          Price: Low to High
        </button>
        <button className="sort-button" onClick={() => handleSort('desc')}>
          Price: High to Low
        </button>
        <button className="sort-button" onClick={() => handleSort('popularity')}>
          Sort by Popularity
        </button>
      </div>

      <div className="product-list">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className="product-card"
            onClick={() => setSelectedProduct({ ...machine, type: 'coffee_machines' })}
            style={{ position: 'relative' }}
          >
            {machine.sum_of === 0 && (
              <div className="stock-badge">Out of Stock</div>
            )}
            {machine.sum_of === 1 && (
              <div className="stock-badge">Last item in stock</div>
            )}

            <img 
              src={`data:image/jpeg;base64,${machine.image}`} 
              alt={machine.name} />
            <div className="product-details">
              <h3>{machine.name}</h3>
              <p>${parseFloat(machine.price).toFixed(2)}</p>

              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart({ ...machine, type: 'coffee_machines' });
                }}
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, quantity) => {
            handleAddToCart(product, quantity);
            setSelectedProduct(null);
          }}
        />
      )}

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          onClose={modalData.onClose}
          onAction={modalData.onAction || modalData.onClose}
          actionText={modalData.actionText}
        />
      )}
    </div>
  );
}
