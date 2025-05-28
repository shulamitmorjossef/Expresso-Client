// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/AdminCoupons.css';
// import baseUrl from '../../config';   
// import { useNavigate } from 'react-router-dom';

// export default function AdminCoupons() {
//     const navigate = useNavigate();
//     const [coupons, setCoupons] = useState([]);
//     const [newCoupon, setNewCoupon] = useState({ codename: '', discount_percent: '' });

//     useEffect(() => {
//         fetchCoupons();
//     }, []);

//     const fetchCoupons = async () => {
//         try {
//             const response = await axios.get(`${baseUrl}/get-all-coupons`);
//             setCoupons(response.data);
//         } catch (err) {
//             console.error('Error fetching coupons:', err);
//         }
//     };

//     const addCoupon = async () => {
//         try {
//             if (newCoupon.codename && newCoupon.discount_percent) {
//                 await axios.post(`${baseUrl}/add-coupon`, newCoupon);
//                 setNewCoupon({ codename: '', discount_percent: '' });
//                 fetchCoupons();
//                 alert('Coupon added successfully!');
//             } else {
//                 alert('Please fill in both codename and discount percent.');
//             }
//         } catch (err) {
//             console.error('Error adding coupon:', err);
//             alert('Failed to add coupon.');
//         }
//     };

//     const deleteCoupon = async (codename) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this coupon?');
//         if (!confirmDelete) return;
//         try {
//             await axios.delete(`${baseUrl}/delete-coupon/${codename}`);
//             fetchCoupons();
//             alert('Coupon deleted successfully!');
//         } catch (err) {
//             console.error('Error deleting coupon:', err);
//             alert('Failed to delete coupon.');
//         }
//     };

//     return (
//         <div className="coupons-container">
//             <h1>Manage Coupons</h1>

//             <div className="add-coupon-form">
//                 <input
//                     type="text"
//                     placeholder="Codename"
//                     value={newCoupon.codename}
//                     onChange={(e) => setNewCoupon({ ...newCoupon, codename: e.target.value })}
//                 />
//                 <input
//                     type="number"
//                     placeholder="Discount (%)"
//                     value={newCoupon.discount_percent}
//                     onChange={(e) => setNewCoupon({ ...newCoupon, discount_percent: e.target.value })}
//                 />
//                 <button onClick={addCoupon}>Add Coupon</button>
//             </div>

//             <ul className="coupons-list">
//                 {coupons.map(coupon => (
//                     <li key={coupon.codename}>
//                         <strong>{coupon.codename}</strong> - {coupon.discount_percent}%
//                         <button onClick={() => deleteCoupon(coupon.codename)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//              <button className="back-button" onClick={() => navigate('/AdminHome')}>
//                 Back
//             </button>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminCoupons.css';
import baseUrl from '../../config';
import { useNavigate } from 'react-router-dom';
import ModalMessage from '../ModalMessage';

export default function AdminCoupons() {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ codename: '', discount_percent: '' });
    const [modalData, setModalData] = useState(null);
    const [onConfirmDelete, setOnConfirmDelete] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get(`${baseUrl}/get-all-coupons`);
            setCoupons(response.data);
        } catch (err) {
            setModalData({
                title: 'Error',
                message: 'Failed to fetch coupons.',
                actionText: 'OK',
                onAction: () => setModalData(null)
            });
        }
    };

    const addCoupon = async () => {
        const { codename, discount_percent } = newCoupon;
    
        if (!codename || !discount_percent) {
            setModalData({
                title: 'Missing Fields',
                message: 'Please fill in both codename and discount percent.',
                actionText: 'OK',
                onAction: () => setModalData(null)
            });
            return;
        }
    
        if (isNaN(discount_percent) || discount_percent <= 0 || discount_percent > 100) {
            setModalData({
                title: 'Invalid Discount',
                message: 'Discount must be a number between 1 and 100.',
                actionText: 'OK',
                onAction: () => setModalData(null)
            });
            return;
        }
    
        try {
            await axios.post(`${baseUrl}/add-coupon`, newCoupon);
            setNewCoupon({ codename: '', discount_percent: '' });
            fetchCoupons();
            setModalData({
                title: 'Success',
                message: 'Coupon added successfully!',
                actionText: 'OK',
                onAction: () => setModalData(null)
            });
        } catch (err) {
            console.error('Error adding coupon:', err);
            setModalData({
                title: 'Error',
                message: 'Failed to add coupon.',
                actionText: 'OK',
                onAction: () => setModalData(null)
            });
        }
    };
    
    const deleteCoupon = async (codename) => {
        const deleteAction = async () => {
            try {
                await axios.delete(`${baseUrl}/delete-coupon/${codename}`);
                fetchCoupons();
                setModalData({
                    title: 'Deleted',
                    message: 'Coupon deleted successfully!',
                    actionText: 'OK',
                    onAction: () => setModalData(null)
                });
            } catch (err) {
                setModalData({
                    title: 'Error',
                    message: 'Failed to delete coupon.',
                    actionText: 'OK',
                    onAction: () => setModalData(null)
                });
            }
        };
    
        setModalData({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this coupon?',
            actionText: 'Yes',
            cancelText: 'No',
            onAction: () => {
                setModalData(null);
                deleteAction(); // נקרא ישירות
            },
            onClose: () => setModalData(null)
        });
    };
    
  

    return (
        <div className="coupons-container">
            <h1>Manage Coupons</h1>

            <div className="add-coupon-form">
                <input
                    type="text"
                    placeholder="Codename"
                    value={newCoupon.codename}
                    onChange={(e) => setNewCoupon({ ...newCoupon, codename: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Discount (%)"
                    value={newCoupon.discount_percent}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount_percent: e.target.value })}
                />
                <button onClick={addCoupon}>Add Coupon</button>
            </div>

            <ul className="coupons-list">
                {coupons.map(coupon => (
                    <li key={coupon.codename}>
                        <strong>{coupon.codename}</strong> - {coupon.discount_percent}%
                        <button onClick={() => deleteCoupon(coupon.codename)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button className="back-button" onClick={() => navigate('/CouponsPage')}>
                Back
            </button>

            {modalData && (
                <ModalMessage
                    title={modalData.title}
                    message={modalData.message}
                    actionText={modalData.actionText}
                    cancelText={modalData.cancelText}
                    onAction={modalData.onAction}
                    onClose={modalData.onClose || (() => setModalData(null))}
                />
            )}
        </div>
    );
}