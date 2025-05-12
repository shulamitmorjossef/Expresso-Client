import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import { Info, Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';
import InventoryModal from './InventoryModal.jsx';

export default function FrotherCatalog() {
  const [frothers, setFrothers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/get-all-milk-frothers`)
      .then(res => setFrothers(res.data))
      .catch(err => {
        console.error('Error loading milk frothers:', err);
        alert('Failed to load milk frothers');
      });
  }, []);

  const handleAdd = () => navigate('/AddFrother');
  const handleEdit = (frother) => navigate(`/EditFrother/${frother.id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this frother?')) {
      axios.delete(`${baseUrl}/delete-milk-frother/${id}`)
        .then(() => setFrothers(frothers.filter(f => f.id !== id)));
    }
  };

  const handleInfo = (frother) => {
    setSelectedProduct({ ...frother, type: 'milk_frother' });
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

      setFrothers(prev =>
        prev.map(f => f.id === id ? { ...f, sum_of: newStock } : f)
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
        <h2>Frothers</h2>
        <button onClick={handleAdd} className="add-button">
          <Plus size={16} style={{ marginRight: 5 }} />
          Add Frother
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
          {frothers.map((frother) => (
            <tr key={frother.id}>
              <td><img src={`data:image/jpeg;base64,${frother.image}`} 
              alt={frother.name} 
              width="50" 
              />
              </td>
              <td>{frother.name}</td>
              <td className="icon-cell">
                <Info color="#8B4513" style={{ cursor: 'pointer' }} onClick={() => handleInfo(frother)} />
                <Pencil color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleEdit(frother)} />
                <Trash2 color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleDelete(frother.id)} />

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
                  {frother.sum_of ?? 0}
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
