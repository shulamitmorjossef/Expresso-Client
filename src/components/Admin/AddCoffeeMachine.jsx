// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { create, test, enforce } from 'vest';
// import baseUrl from '../../config';

// // Create validation suite - same validation rules as EditCoffeeMachine
// const suite = create((data = {}, field) => {
//   // Name - required field validation
//   test('name', 'Name is required', () => {
//     enforce(data.name).isNotEmpty();
//   });
  
//   // Name - only allow letters and spaces, limit to 30 characters
//   test('name', 'Name must contain only letters (max 30)', () => {
//     if (data.name && data.name.trim()) {
//       enforce(data.name)
//         .matches(/^[\p{L}\s]{1,30}$/u); // Unicode letter class to support all languages
//       enforce(data.name.length).lessThanOrEquals(30);
//     }
//   });

//   // Color - required
//   test('color', 'Color is required', () => {
//     enforce(data.color).isNotEmpty();
//   });

//   // Capacity - required
//   test('capacity', 'Capacity is required', () => {
//     enforce(data.capacity).isNotEmpty();
//   });

//   // Capacity - must be a number
//   test('capacity', 'Capacity must contain a number', () => {
//     if (data.capacity && data.capacity.toString().trim()) {
//       enforce(!isNaN(Number(data.capacity))).equals(true);
//     }
//   });

//   // Capacity - valid range
//   test('capacity', 'Capacity must be between 100 and 500 ml', () => {
//     if (data.capacity && !isNaN(Number(data.capacity))) {
//       const capacityValue = Number(data.capacity);
//       enforce(capacityValue)
//         .greaterThanOrEquals(100)
//         .lessThanOrEquals(500);
//     }
//   });

//   // Price - required
//   test('price', 'Price is required', () => {
//     enforce(data.price).isNotEmpty();
//   });

//   // Price - must be a number
//   test('price', 'Price must contain a number', () => {
//     if (data.price && data.price.toString().trim()) {
//       enforce(!isNaN(Number(data.price))).equals(true);
//     }
//   });

//   // Price - must be in range 1-10000
//   test('price', 'Price must be between 1 and 10000', () => {
//     if (data.price && !isNaN(Number(data.price))) {
//       const priceValue = Number(data.price);
//       enforce(priceValue)
//         .greaterThanOrEquals(1)
//         .lessThanOrEquals(10000);
//     }
//   });
// });

// export default function AddCoffeeMachine() {
//   const navigate = useNavigate();
<<<<<<< HEAD
//   const [formData, setFormData] = useState({
=======
//   const [form, setForm] = useState({
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//     name: '',
//     color: '',
//     capacity: '',
//     price: '',
//   });
<<<<<<< HEAD
//   const [image, setImage] = useState(null);
=======
// //   const [image, setImage] = useState(null);
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Available colors - same as in EditCoffeeMachine
//   const colors = [
//     "Black", 
//     "White", 
//     "Silver", 
//     "Light blue", 
//     "Pink", 
//     "Purple", 
//     "Yellow", 
//     "Beige"  
//   ];

//   // Use a single state for validation results
//   const [validationResult, setValidationResult] = useState(suite.get());

//   const handleChange = (field, value) => {
//     // Update the form with the new value
<<<<<<< HEAD
//     const updatedForm = { ...formData, [field]: value };
//     setFormData(updatedForm);
=======
//     const updatedForm = { ...form, [field]: value };
//     setForm(updatedForm);
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
    
//     // Run validation on the updated form
//     const result = suite(updatedForm, field);
//     setValidationResult(result);
//   };

<<<<<<< HEAD
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };
=======
// //   const handleImageChange = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setImage(e.target.files[0]);
// //     }
// //   };
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
    
//     // Run full validation on all fields
<<<<<<< HEAD
//     const result = suite(formData);
=======
//     const result = suite(form);
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//     setValidationResult(result);

//     if (result.hasErrors()) {
//       setError('Please fix the validation errors before saving.');
//       return;
//     }

//     try {
//       setIsSubmitting(true);
      
//       // Create FormData object for sending multipart/form-data (including image)
//       const formData = new FormData();
      
//       // Add form data
<<<<<<< HEAD
//       formData.append('name', formData.name || '');
//       formData.append('color', formData.color || '');
//       formData.append('capacity', formData.capacity || '');
//       formData.append('price', formData.price || '');

//       // If there's an image, add it
//       if (image) {
//         formData.append('image', image);
//       }

//       // Log what we're sending for debugging
//       console.log('Submitting data:', {
//         name: formData.name,
//         color: formData.color,
//         capacity: formData.capacity,
//         price: formData.price
        
=======
//       formData.append('name', form.name || '');
//       formData.append('color', form.color || '');
//       formData.append('capacity', form.capacity || '');
//       formData.append('price', form.price || '');
      
//     //   // If there's an image, add it
//     //   if (image) {
//     //     formData.append('image', image);
//     //   }

//       // Log what we're sending for debugging
//       console.log('Submitting data:', {
//         name: form.name,
//         color: form.color,
//         capacity: form.capacity,
//         price: form.price
//         // hasImage: !!image
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//       });

//       // Try with FormData approach
//       try {
//         const response = await axios.post(`${baseUrl}/add-coffee-machines`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
        
//         console.log('Server response:', response.data);
//         setSuccess('Coffee machine added successfully!');
        
//         // Reset form after successful submission
<<<<<<< HEAD
//         setFormData({
=======
//         setForm({
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//           name: '',
//           color: '',
//           capacity: '',
//           price: '',
//         });
//         // setImage(null);
        
//         // Navigate after short delay to show success message
//         setTimeout(() => {
//           navigate('/CoffeeCatalog');
//         }, 1500);
        
//       } catch (formDataErr) {
//         console.warn('FormData approach failed, trying JSON:', formDataErr);
        
//         // Fallback to JSON approach if FormData fails
//         const jsonData = {
<<<<<<< HEAD
//           name: formData.name,
//           color: formData.color,
//           capacity: Number(formData.capacity), // Convert to number for JSON
//           price: Number(formData.price), // Convert to number for JSON
=======
//           name: form.name,
//           color: form.color,
//           capacity: Number(form.capacity), // Convert to number for JSON
//           price: Number(form.price), // Convert to number for JSON
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//         };
        
//         const response = await axios.post(`${baseUrl}/add-coffee-machines`, jsonData);
//         console.log('Server response (JSON):', response.data);
<<<<<<< HEAD
//         setSuccess('Coffee machine added successfully!');
        
//         // Reset form after successful submission
//         setFormData({
=======
//         setSuccess('✅ Coffee machine added successfully!');
        
//         // Reset form after successful submission
//         setForm({
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//           name: '',
//           color: '',
//           capacity: '',
//           price: '',
//         });
//         // setImage(null);
        
//         // Navigate after short delay to show success message
//         setTimeout(() => {
//           navigate('/CoffeeCatalog');
//         }, 1500);
//       }
//     } catch (err) {
<<<<<<< HEAD
//       console.error('Add machine failed:', err);
=======
//       console.error('❌ Add machine failed:', err);
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//       setError(err.response?.data?.message || 'Failed to add coffee machine. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Helper function to display errors for a specific field
//   const getFieldErrors = (field) => {
//     return validationResult.getErrors(field);
//   };

//   // Helper function to check if a field has errors
//   const hasFieldErrors = (field) => {
//     return validationResult.hasErrors(field);
//   };

//   return (
//     <form className="add-form" onSubmit={handleSubmit} encType="multipart/form-data">
//       <h2>Add New Coffee Machine</h2>

//       {error && <div className="error-message">{error}</div>}
//       {success && <div className="success-message">{success}</div>}

//       <label>Name:</label>
//       <input
//         type="text"
<<<<<<< HEAD
//         value={formData.name}
=======
//         value={form.name}
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//         onChange={e => handleChange('name', e.target.value)}
//         className={hasFieldErrors('name') ? 'invalid' : ''}
//         placeholder="Enter machine name"
//       />
//       {hasFieldErrors('name') && (
//         <div className="error">{getFieldErrors('name')[0]}</div>
//       )}

//       <label>Color:</label>
//       <select
<<<<<<< HEAD
//         value={formData.color}
=======
//         value={form.color}
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//         onChange={e => handleChange('color', e.target.value)}
//         className={hasFieldErrors('color') ? 'invalid' : ''}
//       >
//         <option value="">Select Color</option>
//         {colors.map(color => (
//           <option key={color} value={color}>{color}</option>
//         ))}
//       </select>
//       {hasFieldErrors('color') && (
//         <div className="error">{getFieldErrors('color')[0]}</div>
//       )}

//       <label>Water Tank Capacity (ml):</label>
//       <input
//         type="text"
<<<<<<< HEAD
//         value={formData.capacity}
=======
//         value={form.capacity}
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//         onChange={e => handleChange('capacity', e.target.value)}
//         className={hasFieldErrors('capacity') ? 'invalid' : ''}
//         placeholder="Enter capacity (100-500 ml)"
//       />
//       {hasFieldErrors('capacity') && (
//         <div className="error">{getFieldErrors('capacity')[0]}</div>
//       )}

//       <label>Price:</label>
//       <input
//         type="text"
<<<<<<< HEAD
//         value={formData.price}
=======
//         value={form.price}
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//         onChange={e => handleChange('price', e.target.value)}
//         className={hasFieldErrors('price') ? 'invalid' : ''}
//         placeholder="Enter price (1-10000)"
//       />
//       {hasFieldErrors('price') && (
//         <div className="error">{getFieldErrors('price')[0]}</div>
//       )}
<<<<<<< HEAD

=======
// {/* 
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//       <label>Machine Image:</label>
//       <input 
//         type="file" 
//         accept="image/*" 
//         onChange={handleImageChange}
//       />
<<<<<<< HEAD
//       {/* {image && (
=======
//       {image && (
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//         <div className="preview">
//           <p>Selected image: {image.name}</p>
//           <img 
//             src={URL.createObjectURL(image)} 
//             alt="Preview" 
//             style={{ maxWidth: '100px', marginTop: '10px' }} 
//           />
<<<<<<< HEAD
//         </div> )} */}
      
=======
//         </div> */}
//       {/* )} */}
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e

//       <button 
//         type="submit" 
//         disabled={isSubmitting}
//         className={isSubmitting ? 'submitting' : ''}
//       >
//         {isSubmitting ? 'Saving...' : '➕ Add Coffee Machine'}
//       </button>

//       <style>{`
//         .add-form {
//           padding: 20px;
//           max-width: 400px;
//         }
//         .add-form label {
//           font-weight: bold;
//           display: block;
//           margin-top: 15px;
//         }
//         .add-form input, .add-form select {
//           width: 100%;
//           padding: 6px;
//           margin-top: 4px;
//         }
//         .add-form button {
//           margin-top: 20px;
//           padding: 8px 16px;
//           background-color: #4285f4;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//           font-weight: bold;
//         }
//         .add-form button:hover {
//           background-color: #3367d6;
//         }
//         .add-form button.submitting {
//           background-color: #cccccc;
//           cursor: not-allowed;
//         }
//         .error {
<<<<<<< HEAD
//           color: black;
=======
//           color: red;
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//           font-size: 0.85em;
//           margin-top: 4px;
//         }
//         .error-message {
<<<<<<< HEAD
//           background-color:  #f5f5f5;
//           color: black !important;
//           padding: 10px;
//           border-radius: 4px;
//           margin-bottom: 15px;
//           border-left:  4px solid #999;
=======
//           background-color: #ffebee;
//           color: #d32f2f;
//           padding: 10px;
//           border-radius: 4px;
//           margin-bottom: 15px;
//           border-left: 4px solid #d32f2f;
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
//         }
//         .success-message {
//           background-color: #e8f5e9;
//           color: #2e7d32;
//           padding: 10px;
//           border-radius: 4px;
//           margin-bottom: 15px;
//           border-left: 4px solid #2e7d32;
//         }
//         .invalid {
//           border: 1px solid red;
//         }
//         .preview {
//           margin-top: 10px;
//           font-size: 0.9em;
//           color: #555;
//         }
//       `}</style>
//     </form>
//   );
// }

<<<<<<< HEAD
=======



>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { create, test, enforce } from 'vest';
import baseUrl from '../../config';

// Create validation suite - same validation rules as EditCoffeeMachine
const suite = create((data = {}, field) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });
  test('name', 'Name must contain only letters (max 30)', () => {
    if (data.name && data.name.trim()) {
      enforce(data.name).matches(/^[A-Za-z\s]{1,30}$/);;
      enforce(data.name.length).lessThanOrEquals(30);
    }
  });
  test('color', 'Color is required', () => {
    enforce(data.color).isNotEmpty();
  });
<<<<<<< HEAD
  test('capacity', 'Capacity is required', () => {
    enforce(data.capacity).isNotEmpty();
  });
  test('capacity', 'Capacity must contain a number', () => {
    if (data.capacity && data.capacity.toString().trim()) {
      enforce(!isNaN(Number(data.capacity))).equals(true);
    }
  });
  test('capacity', 'Capacity must be between 100 and 500 ml', () => {
    if (data.capacity && !isNaN(Number(data.capacity))) {
      const capacityValue = Number(data.capacity);
      enforce(capacityValue).greaterThanOrEquals(100).lessThanOrEquals(500);
    }
  });
  test('price', 'Price is required', () => {
    enforce(data.price).isNotEmpty();
  });
  test('price', 'Price must contain a number', () => {
    if (data.price && data.price.toString().trim()) {
      enforce(!isNaN(Number(data.price))).equals(true);
    }
  });
  test('price', 'Price must be between 1 and 10000', () => {
    if (data.price && !isNaN(Number(data.price))) {
      const priceValue = Number(data.price);
=======

  // Capacity - required and numeric
  test('capacity', 'Capacity must be a number between 100 and 500 ml', () => {
    if (data.capacity) {
      const capacityValue = Number(data.capacity);
      enforce(!isNaN(capacityValue)).equals(true);
      enforce(capacityValue).greaterThanOrEquals(100).lessThanOrEquals(500);
    }
  });

  // Price - required and numeric
  test('price', 'Price must be a number between 1 and 10000', () => {
    if (data.price) {
      const priceValue = Number(data.price);
      enforce(!isNaN(priceValue)).equals(true);
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
      enforce(priceValue).greaterThanOrEquals(1).lessThanOrEquals(10000);
    }
  });
});

export default function AddCoffeeMachine() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    capacity: '',
    price: '',
  });
  const [image, setImage] = useState(null);
<<<<<<< HEAD
=======
  const [validationResult, setValidationResult] = useState(suite.get());
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

<<<<<<< HEAD
  const colors = ["Black", "White", "Silver", "Light blue", "Pink", "Purple", "Yellow", "Beige"];
  const [validationResult, setValidationResult] = useState(suite.get());

  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);
=======
  const handleChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
    setValidationResult(suite(updatedForm, field));
  };

  const handleImageChange = (e) => {
<<<<<<< HEAD
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
=======
    setImage(e.target.files[0]);
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setError('');
    setSuccess('');
    const result = suite(formData);
=======
    const result = suite(form);
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
    setValidationResult(result);

    if (result.hasErrors()) {
      setError('Please fix the validation errors before saving.');
      return;
    }

    try {
      setIsSubmitting(true);
<<<<<<< HEAD
      const formUpload = new FormData();
      formUpload.append('name', formData.name || '');
      formUpload.append('color', formData.color || '');
      formUpload.append('capacity', formData.capacity || '');
      formUpload.append('price', formData.price || '');
      if (image) {
        formUpload.append('image', image);
      }

      console.log('Submitting data:', {
        name: formData.name,
        color: formData.color,
        capacity: formData.capacity,
        price: formData.price,
      });

      try {
        const response = await axios.post(`${baseUrl}/add-coffee-machines`, formUpload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Server response:', response.data);
        setSuccess('Coffee machine added successfully!');
        setFormData({ name: '', color: '', capacity: '', price: '' });
        setTimeout(() => navigate('/CoffeeCatalog'), 1500);
      } catch (formDataErr) {
        console.warn('FormData approach failed, trying JSON:', formDataErr);
        const jsonData = {
          name: formData.name,
          color: formData.color,
          capacity: Number(formData.capacity),
          price: Number(formData.price),
        };
        const response = await axios.post(`${baseUrl}/add-coffee-machines`, jsonData);
        console.log('Server response (JSON):', response.data);
        setSuccess('Coffee machine added successfully!');
        setFormData({ name: '', color: '', capacity: '', price: '' });
        setTimeout(() => navigate('/CoffeeCatalog'), 1500);
      }
    } catch (err) {
      console.error('Add machine failed:', err);
=======
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('color', form.color);
      formData.append('capacity', form.capacity);
      formData.append('price', form.price);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${baseUrl}/add-coffee-machines`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Coffee machine added successfully!');
      setForm({ name: '', color: '', capacity: '', price: '' });
      setImage(null);
      setTimeout(() => navigate('/CoffeeCatalog'), 1500);
    } catch (err) {
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
      setError(err.response?.data?.message || 'Failed to add coffee machine. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldErrors = (field) => validationResult.getErrors(field);
  const hasFieldErrors = (field) => validationResult.hasErrors(field);

  return (
    <form className="add-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add New Coffee Machine</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <label>Name:</label>
<<<<<<< HEAD
      <input
        type="text"
        value={formData.name}
        onChange={e => handleChange('name', e.target.value)}
        className={hasFieldErrors('name') ? 'invalid' : ''}
        placeholder="Enter machine name"
      />
      {hasFieldErrors('name') && <div className="error">{getFieldErrors('name')[0]}</div>}

      <label>Color:</label>
      <select
        value={formData.color}
        onChange={e => handleChange('color', e.target.value)}
        className={hasFieldErrors('color') ? 'invalid' : ''}
      >
        <option value="">Select Color</option>
        {colors.map(color => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>
      {hasFieldErrors('color') && <div className="error">{getFieldErrors('color')[0]}</div>}

      <label>Water Tank Capacity (ml):</label>
      <input
        type="text"
        value={formData.capacity}
        onChange={e => handleChange('capacity', e.target.value)}
        className={hasFieldErrors('capacity') ? 'invalid' : ''}
        placeholder="Enter capacity (100-500 ml)"
      />
      {hasFieldErrors('capacity') && <div className="error">{getFieldErrors('capacity')[0]}</div>}

      <label>Price:</label>
      <input
        type="text"
        value={formData.price}
        onChange={e => handleChange('price', e.target.value)}
        className={hasFieldErrors('price') ? 'invalid' : ''}
        placeholder="Enter price (1-10000)"
      />
      {hasFieldErrors('price') && <div className="error">{getFieldErrors('price')[0]}</div>}

      <label>Machine Image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
=======
      <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} className={hasFieldErrors('name') ? 'invalid' : ''} />
      {hasFieldErrors('name') && <div className="error">{getFieldErrors('name')[0]}</div>}

      <label>Color:</label>
      <input type="text" value={form.color} onChange={(e) => handleChange('color', e.target.value)} className={hasFieldErrors('color') ? 'invalid' : ''} />
      {hasFieldErrors('color') && <div className="error">{getFieldErrors('color')[0]}</div>}

      <label>Capacity (ml):</label>
      <input type="text" value={form.capacity} onChange={(e) => handleChange('capacity', e.target.value)} className={hasFieldErrors('capacity') ? 'invalid' : ''} />
      {hasFieldErrors('capacity') && <div className="error">{getFieldErrors('capacity')[0]}</div>}

      <label>Price:</label>
      <input type="text" value={form.price} onChange={(e) => handleChange('price', e.target.value)} className={hasFieldErrors('price') ? 'invalid' : ''} />
      {hasFieldErrors('price') && <div className="error">{getFieldErrors('price')[0]}</div>}

      <label>Machine Image:</label>
      <input type="file" onChange={handleImageChange} />
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e

      <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
        {isSubmitting ? 'Saving...' : '➕ Add Coffee Machine'}
      </button>
<<<<<<< HEAD

      <style>{`
        .add-form {
          padding: 20px;
          max-width: 400px;
        }
        .add-form label {
          font-weight: bold;
          display: block;
          margin-top: 15px;
        }
        .add-form input, .add-form select {
          width: 100%;
          padding: 6px;
          margin-top: 4px;
        }
        .add-form button {
          margin-top: 20px;
          padding: 8px 16px;
          background-color: #4285f4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .add-form button:hover {
          background-color: #3367d6;
        }
        .add-form button.submitting {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .error {
          color: black;
          font-size: 0.85em;
          margin-top: 4px;
        }
        .error-message {
          background-color:  #f5f5f5;
          color: black !important;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left:  4px solid #999;
        }
        .success-message {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left: 4px solid #2e7d32;
        }
        .invalid {
          border: 1px solid red;
        }
        .preview {
          margin-top: 10px;
          font-size: 0.9em;
          color: #555;
        }
      `}</style>
=======
>>>>>>> b2c5636cd002a8e4cbbc33610d14c62b64c98e9e
    </form>
  );
}
