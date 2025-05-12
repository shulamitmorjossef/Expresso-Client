import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import { Info, Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';
import InventoryModal from './InventoryModal.jsx';

export default function CoffeeCatalog() {
  const [machines, setMachines] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/get-all-coffee-machines`)
      .then(res => setMachines(res.data))
      .catch(err => {
        console.error(' Error loading coffee machines:', err);
        alert('Failed to load coffee machines');
      });
  }, []);

  const handleAdd = () => navigate('/AddCoffeeMachine');
  const handleEdit = (machine) => navigate(`/EditCoffeeMachine/${machine.id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this machine?')) {
      axios.delete(`${baseUrl}/delete-coffee-machine/${id}`)
        .then(() => setMachines(machines.filter(m => m.id !== id)));
    }
  };

  const handleInfo = (machine) => {
    setSelectedProduct({ ...machine, type: 'coffee_machine' });
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

      setMachines(prev =>
        prev.map(m => m.id === id ? { ...m, sum_of: newStock } : m)
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
        <h2>Coffee Machine</h2>
        <button onClick={handleAdd} className="add-button">
          <Plus size={16} style={{ marginRight: 5 }} />
          Add Coffee Machine
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
          {machines.map((machine) => (
            <tr key={machine.id}>
        <td>
        <img 
          src= {`data:image/jpeg;base64,${machine.image}`} 
          alt={machine.name} 
          width="50" 
        />
        </td>
              <td>{machine.name}</td>
              <td className="icon-cell">
                <Info color="#8B4513" style={{ cursor: 'pointer' }} onClick={() => handleInfo(machine)} />
                <Pencil color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleEdit(machine)} />
                <Trash2 color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleDelete(machine.id)} />

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
                  {machine.sum_of ?? 0}
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
