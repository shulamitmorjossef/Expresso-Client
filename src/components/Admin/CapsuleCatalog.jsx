import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import { Info, Pencil, Trash2, Plus } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';
import InventoryModal from './InventoryModal.jsx';




export default function CapsuleCatalog() {
  const [capsules, setCapsules] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/get-all-capsule`)
      .then(res => setCapsules(res.data))
      .catch(err => {
        console.error('❌ Error loading capsules:', err);
        alert('Failed to load capsules');
      });
  }, []);

  
  const handleAdd = () => navigate('/AddCapsule');
  const handleEdit = (capsule) => navigate(`/EditCapsule/${capsule.id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this capsule?')) {
      axios.delete(`${baseUrl}/delete-capsule/${id}`)
        .then(() => setCapsules(capsules.filter(c => c.id !== id)));
    }
  };
  const handleInfo = (capsule) => {
    setSelectedProduct({ ...capsule, type: 'capsule' });
  };

  const handleUpdateStock = async (id, newStock, type) => {
    const endpoint = {
      capsule: 'update-capsule-stock',
      coffee_machine: 'update-coffee-machine-stock',
      milk_frother: 'update-milk-frother-stock'
    };
  
    try {
      await axios.put(`${baseUrl}/${endpoint[type]}/${id}`, {
        sum_of: newStock
      });
  
      setCapsules(prev =>
        prev.map(c => c.id === id ? { ...c, sum_of: newStock } : c)
      );
      return true;
    } catch (err) {
      console.error('Failed to update stock:', err);
      throw err;
    }
  };

  return (
    <div className="catalog-page">
      <div className="header-row">
        <h2>Capsules</h2>
        <button onClick={handleAdd} className="add-button">
          <Plus size={16} style={{ marginRight: 5 }} />
          Add Capsule
        </button>
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
                <img src={`${baseUrl}${capsule.image_path}`} alt={capsule.name} width="50" />
              </td>
              <td>{capsule.name}</td>
              <td className="icon-cell">
                <Info color="#8B4513" style={{ cursor: 'pointer' }} onClick={() => handleInfo(capsule)} />
                <Pencil color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleEdit(capsule)} />
                <Trash2 color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleDelete(capsule.id)} />
        
  {/*  stock */}
  <span style={{
    display: 'inline-block',
    marginLeft: 15,
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '3px 8px',
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#333',
    minWidth: '30px',
    textAlign: 'center'
  }}>
    {capsule.sum_of}
  </span>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
  <InventoryModal
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
    onUpdateStock={handleUpdateStock}
  />
)}
    </div>
  );
}
