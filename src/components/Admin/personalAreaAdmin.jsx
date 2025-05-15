// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import baseUrl from '../../config';
// // import "../styles/PersonalAreaAdmin.css";
// // import { useNavigate } from 'react-router-dom';

// // export default function PersonalAreaAdmin() {
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState(null);
// //   const [editMode, setEditMode] = useState(false);
// //   const [form, setForm] = useState({
// //     full_name: '',
// //     username: '',
// //     email: '',
// //     phone: '',
// //     password: '',
// //     confirmPassword: ''
// //   });
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const username = localStorage.getItem('username');
// //         if (!username) {
// //           setError('Missing user in local storage');
// //           return;
// //         }

// //         const response = await axios.get(`${baseUrl}/get-user-details/${username}`);

// //         if (response.data.success) {
// //           const user = response.data.user;
// //           setUser(user);
// //           setForm({
// //             full_name: user.full_name,
// //             username: user.username,
// //             email: user.email,
// //             phone: user.phone,
// //             password: user.password,
// //             confirmPassword: user.password
// //           });
// //         } else {
// //           setError('Failed to fetch user data');
// //         }
// //       } catch (err) {
// //         setError('Error fetching user data');
// //       }
// //     };

// //     fetchUserData();
// //   }, []);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const validatePassword = (password) => {
// //     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
// //     return regex.test(password);
// //   };

// //   const handleSave = () => {
// //     if (form.password !== user.password) {
// //       if (!validatePassword(form.password)) {
// //         setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
// //         setSuccess('');
// //         return;
// //       }

// //       if (form.password !== form.confirmPassword) {
// //         setError('Passwords do not match.');
// //         setSuccess('');
// //         return;
// //       }
// //     }

// //     const hasChanges = Object.keys(form).some(
// //       key => key !== 'confirmPassword' && form[key] !== user[key]
// //     );

// //     if (!hasChanges) {
// //       setError('No changes detected.');
// //       setSuccess('');
// //       return;
// //     }

// //     const confirmed = window.confirm("Are you sure you want to update your details?");
// //     if (!confirmed) return;

// //     const username = localStorage.getItem('username');
// //     axios.put(`${baseUrl}/update-user-details/${username}`, form)
// //       .then(res => {
// //         if (res.data.success) {
// //           setUser(res.data.user);
// //           setEditMode(false);
// //           setSuccess('Details updated successfully!');
// //           setError('');
// //         } else {
// //           setError('Failed to update user');
// //           setSuccess('');
// //         }
// //       })
// //       .catch(() => {
// //         setError('Failed to update details');
// //         setSuccess('');
// //       });
// //   };

// //   return (
// //     <div className="page-with-background">
// //       <div className="personal-area-admin">
// //         <h2>My Profile</h2>

// //         {error && <div className="error">{error}</div>}
// //         {success && <div className="success">{success}</div>}

// //         <label>
// //           Full Name:
// //           <input
// //             type="text"
// //             name="full_name"
// //             value={form.full_name}
// //             onChange={handleChange}
// //             disabled={!editMode}
// //           />
// //         </label>

// //         <label>
// //           Username:
// //           <input
// //             type="text"
// //             name="username"
// //             value={form.username}
// //             onChange={handleChange}
// //             disabled={!editMode}
// //           />
// //         </label>

// //         <label>
// //           Email:
// //           <input
// //             type="email"
// //             name="email"
// //             value={form.email}
// //             onChange={handleChange}
// //             disabled={!editMode}
// //           />
// //         </label>

// //         <label>
// //           Phone:
// //           <input
// //             type="tel"
// //             name="phone"
// //             value={form.phone}
// //             onChange={handleChange}
// //             disabled={!editMode}
// //           />
// //         </label>

// //         <label>
// //           New Password:
// //           <input
// //             type="password"
// //             name="password"
// //             value={form.password}
// //             onChange={handleChange}
// //             disabled={!editMode}
// //           />
// //         </label>

// //         <label>
// //           Confirm Password:
// //           <input
// //             type="password"
// //             name="confirmPassword"
// //             value={form.confirmPassword}
// //             onChange={handleChange}
// //             disabled={!editMode}
// //           />
// //         </label>

// //         {!editMode ? (
// //           <button onClick={() => setEditMode(true)}>Edit</button>
// //         ) : (
// //           <>
// //             <button onClick={handleSave}>Save</button>
// //             <button onClick={() => {
// //               setEditMode(false);
// //               setForm({ 
// //                 full_name: user.full_name,
// //                 username: user.username,
// //                 email: user.email,
// //                 phone: user.phone,
// //                 password: user.password,
// //                 confirmPassword: user.password
// //               });
// //               setError('');
// //               setSuccess('');
// //             }}>Cancel</button>
// //           </>
// //         )}
// //       </div>
// //       <button className="back-button" onClick={() => navigate('/AdminHome')}>
// //         Back
// //       </button>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import baseUrl from '../../config';
// import "../styles/PersonalAreaAdmin.css";
// import { useNavigate } from 'react-router-dom';
// import ModalMessage from '../ModalMessage';

// export default function PersonalAreaAdmin() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [modalData, setModalData] = useState(null);

//   const [form, setForm] = useState({
//     full_name: '',
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const username = localStorage.getItem('username');
//         if (!username) {
//           setModalData({
//             title: 'Error',
//             message: 'Missing user in local storage.',
//             actionText: 'OK',
//             onAction: () => setModalData(null)
//           });
//           return;
//         }

//         const response = await axios.get(`${baseUrl}/get-user-details/${username}`);
//         if (response.data.success) {
//           const user = response.data.user;
//           setUser(user);
//           setForm({
//             full_name: user.full_name,
//             username: user.username,
//             email: user.email,
//             phone: user.phone,
//             password: user.password,
//             confirmPassword: user.password
//           });
//         } else {
//           setModalData({
//             title: 'Error',
//             message: 'Failed to fetch user data.',
//             actionText: 'OK',
//             onAction: () => setModalData(null)
//           });
//         }
//       } catch (err) {
//         setModalData({
//           title: 'Error',
//           message: 'Error fetching user data.',
//           actionText: 'OK',
//           onAction: () => setModalData(null)
//         });
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//     return regex.test(password);
//   };

//   const handleSave = () => {
//     if (form.password !== user.password) {
//       if (!validatePassword(form.password)) {
//         setModalData({
//           title: 'Invalid Password',
//           message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
//           actionText: 'OK',
//           onAction: () => setModalData(null)
//         });
//         return;
//       }

//       if (form.password !== form.confirmPassword) {
//         setModalData({
//           title: 'Mismatch',
//           message: 'Passwords do not match.',
//           actionText: 'OK',
//           onAction: () => setModalData(null)
//         });
//         return;
//       }
//     }

//     const hasChanges = Object.keys(form).some(
//       key => key !== 'confirmPassword' && form[key] !== user[key]
//     );

//     if (!hasChanges) {
//       setModalData({
//         title: 'No Changes',
//         message: 'No changes detected.',
//         actionText: 'OK',
//         onAction: () => setModalData(null)
//       });
//       return;
//     }

//     // Confirm dialog
//     setModalData({
//       title: 'Confirm Changes',
//       message: 'Are you sure you want to update your details?',
//       actionText: 'Yes',
//       onAction: () => {
//         setModalData(null);
//         const username = localStorage.getItem('username');
//         axios.put(`${baseUrl}/update-user-details/${username}`, form)
//           .then(res => {
//             if (res.data.success) {
//               setUser(res.data.user);
//               setEditMode(false);
//               setModalData({
//                 title: 'Success',
//                 message: 'Details updated successfully!',
//                 actionText: 'OK',
//                 onAction: () => setModalData(null)
//               });
//             } else {
//               setModalData({
//                 title: 'Error',
//                 message: 'Failed to update user.',
//                 actionText: 'OK',
//                 onAction: () => setModalData(null)
//               });
//             }
//           })
//           .catch(() => {
//             setModalData({
//               title: 'Error',
//               message: 'Failed to update details.',
//               actionText: 'OK',
//               onAction: () => setModalData(null)
//             });
//           });
//       }
//     });
//   };

//   return (
//     <div className="page-with-background">
//       <div className="personal-area-admin">
//         <h2>My Profile</h2>

//         <label>
//           Full Name:
//           <input
//             type="text"
//             name="full_name"
//             value={form.full_name}
//             onChange={handleChange}
//             disabled={!editMode}
//           />
//         </label>

//         <label>
//           Username:
//           <input
//             type="text"
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             disabled={!editMode}
//           />
//         </label>

//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             disabled={!editMode}
//           />
//         </label>

//         <label>
//           Phone:
//           <input
//             type="tel"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             disabled={!editMode}
//           />
//         </label>

//         <label>
//           New Password:
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             disabled={!editMode}
//           />
//         </label>

//         <label>
//           Confirm Password:
//           <input
//             type="password"
//             name="confirmPassword"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             disabled={!editMode}
//           />
//         </label>

//         {!editMode ? (
//           <button onClick={() => setEditMode(true)}>Edit</button>
//         ) : (
//           <>
//             <button onClick={handleSave}>Save</button>
//             <button onClick={() => {
//               setEditMode(false);
//               setForm({
//                 full_name: user.full_name,
//                 username: user.username,
//                 email: user.email,
//                 phone: user.phone,
//                 password: user.password,
//                 confirmPassword: user.password
//               });
//             }}>Cancel</button>
//           </>
//         )}
//       </div>

//       <button className="back-button" onClick={() => navigate('/AdminHome')}>
//         Back
//       </button>

//       {modalData && (
//         <ModalMessage
//           title={modalData.title}
//           message={modalData.message}
//           actionText={modalData.actionText}
//           onAction={modalData.onAction}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../config';
import "../styles/PersonalAreaAdmin.css";
import { useNavigate } from 'react-router-dom';
import ModalMessage from '../ModalMessage';

export default function PersonalAreaAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          return showModal('Error', 'Missing user in local storage.');
        }

        const response = await axios.get(`${baseUrl}/get-user-details/${username}`);
        if (response.data.success) {
          const user = response.data.user;
          setUser(user);
          setForm({
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: user.password,
            confirmPassword: user.password
          });
        } else {
          showModal('Error', 'Failed to fetch user data.');
        }
      } catch (err) {
        showModal('Error', 'Error fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSave = () => {
    const trimmedForm = {
      ...form,
      full_name: form.full_name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      phone: form.phone.trim()
    };

    if (!trimmedForm.full_name) {
      return showModal('Invalid Full Name', 'Full name is required.');
    }

    if (!trimmedForm.username) {
      return showModal('Invalid Username', 'Username is required.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedForm.email || !emailRegex.test(trimmedForm.email)) {
      return showModal('Invalid Email', 'Please enter a valid email address.');
    }

    const phoneRegex = /^05\d{8}$/;
    if (!trimmedForm.phone || !phoneRegex.test(trimmedForm.phone)) {
      return showModal('Invalid Phone', 'Phone number must be 10 digits and start with 05.');
    }

    if (form.password !== user.password) {
      if (!validatePassword(form.password)) {
        return showModal('Invalid Password', 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      }

      if (form.password !== form.confirmPassword) {
        return showModal('Mismatch', 'Passwords do not match.');
      }
    }

    const hasChanges = Object.keys(form).some(
      key => key !== 'confirmPassword' && form[key] !== user[key]
    );

    if (!hasChanges) {
      return showModal('No Changes', 'No changes detected.');
    }

    setModalData({
      title: 'Confirm Changes',
      message: 'Are you sure you want to update your details?',
      actionText: 'Yes',
      onAction: async () => {
        setModalData(null);
        try {
          const oldUsername = localStorage.getItem('username');
          const res = await axios.put(`${baseUrl}/update-user-detail/${oldUsername}`, form);
          if (res.data.success) {
            const updated = res.data.user;
            setUser(updated);
            setEditMode(false);
            setForm({
              full_name: updated.full_name,
              username: updated.username,
              email: updated.email,
              phone: updated.phone,
              password: updated.password,
              confirmPassword: updated.password
            });

            // Update localStorage if username changed
            if (updated.username !== oldUsername) {
              localStorage.setItem('username', updated.username);
            }

            showModal('Success', 'Details updated successfully!');
          } else {
            showModal('Error', 'Failed to update user.');
          }
        } catch (err) {
          showModal('Error', 'Failed to update details.');
        }
      }
    });
  };

  const showModal = (title, message) => {
    setModalData({
      title,
      message,
      actionText: 'OK',
      onAction: () => setModalData(null)
    });
  };

  return (
    <div className="page-with-background">
      <div className="personal-area-admin">
        <h2>My Profile</h2>

        <label>
          Full Name:
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        <label>
          New Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>

        {!editMode ? (
          <button onClick={() => setEditMode(true)}>Edit</button>
        ) : (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => {
              setEditMode(false);
              setForm({
                full_name: user.full_name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                password: user.password,
                confirmPassword: user.password
              });
              setModalData(null);
            }}>Cancel</button>
          </>
        )}
      </div>

      <button className="back-button" onClick={() => navigate('/AdminHome')}>
        Back
      </button>

      {modalData && (
        <ModalMessage
          title={modalData.title}
          message={modalData.message}
          actionText={modalData.actionText}
          onAction={modalData.onAction}
        />
      )}
    </div>
  );
}
