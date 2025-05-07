import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import { Info, Pencil, Trash2 } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';


export default function CapsuleCatalog() {
  const [capsules, setCapsules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/get-all-capsule')
      .then(res => setCapsules(res.data))
      .catch(err => {
        console.error('❌ Error loading capsules:', err);
        alert('Failed to load capsules');
      });
  }, []);

  const handleAdd = () => alert('Add new capsule');
  const handleEdit = (capsule) => navigate(`/EditCapsule/${capsule.id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this capsule?')) {
      axios.delete(`http://localhost:3000/delete-capsule/${id}`)
        .then(() => setCapsules(capsules.filter(c => c.id !== id)));
    }
  };
  const handleInfo = (capsule) => {
    alert(
      `Name: ${capsule.name}\nFlavor: ${capsule.flavor}\nQuantity: ${capsule.quantity_per_package}\n` +
      `Weight: ${capsule.net_weight_grams}g\nPrice: ${capsule.price} ₪\nIngredients: ${capsule.ingredients}`
    );
  };

  return (
    <div className="catalog-page">
      <div className="header-row">
        <h2>Capsules</h2>
        <button onClick={handleAdd} className="add-button">+ Add Capsule</button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {capsules.map((capsule) => (
            <tr key={capsule.id}>
              <td>
                <img src={capsule.image_path} alt={capsule.name} width="50" />
              </td>
              <td>{capsule.name}</td>
              <td className="icon-cell">
                <Info color="#8B4513" style={{ cursor: 'pointer' }} onClick={() => handleInfo(capsule)} />
                <Pencil color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleEdit(capsule)} />
                <Trash2 color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleDelete(capsule.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
