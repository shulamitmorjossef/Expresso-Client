import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import '../styles/Tables.css'

import { Info, Pencil, Trash2, Plus, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';
import InventoryModal from './InventoryModal.jsx';

export default function CapsuleCatalog() {
  const [capsules, setCapsules] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}/get-all-capsule`)
      .then(res => {
        setCapsules(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading capsules:', err);
        alert('Failed to load capsules');
        setLoading(false);
      });
  }, []);
  
  const handleAdd = () => navigate('/AddCapsule');
  
  const handleEdit = (capsule) => navigate(`/EditCapsule/${capsule.id}`);
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this capsule?')) {
      axios.delete(`${baseUrl}/delete-capsule/${id}`)
        .then(() => setCapsules(capsules.filter(c => c.id !== id)))
        .catch(err => {
          console.error('Error deleting capsule:', err);
          alert('Failed to delete capsule');
        });
    }
  };
  
  const handleInfo = (capsule) => {
    setSelectedProduct({
      ...capsule,
      type: 'capsule',
      sum_of: capsule.sum_of ?? 0
    });
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
    <div className="catalog-page capsule-page">
      <div className="header-row">
        <h2>
          Capsules
        </h2>
        <button onClick={handleAdd} className="add-button">
          <Plus size={16} style={{ marginRight: 5 }} />
          Add Capsule
        </button>
      </div>
      
      <div className="table-container">
        {loading ? (
          <div className="loading">Loading capsule catalog...</div>
        ) : capsules.length === 0 ? (
          <div className="no-products">No capsules found. Add your first capsule!</div>
        ) : (
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
                    <img
                      src={`data:image/jpeg;base64,${capsule.image}`}
                      alt={capsule.name}
                      width = "50"
                    />
                  </td>
                  <td>{capsule.name}</td>
                  <td className="icon-cell">
  <div className="icon-actions">
    <Info size={20} color="#8B4513" onClick={() => handleInfo(capsule)} title="View Details" />
    <Pencil size={20} color="#8B4513" onClick={() => handleEdit(capsule)} title="Edit" />
    <Trash2 size={20} color="#8B4513" onClick={() => handleDelete(capsule.id)} title="Delete" />
    <span className="stock-box">
      {capsule.sum_of ?? 0}
    </span>
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
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