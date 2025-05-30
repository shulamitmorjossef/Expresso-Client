// 


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import '../styles/Tables.css';
import { Info, Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';
import InventoryModal from './InventoryModal.jsx';
import ModalMessage from '../ModalMessage';

export default function CoffeeCatalog() {
  const [machines, setMachines] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/get-all-coffee-machines`)
      .then(res => setMachines(res.data))
      .catch(err => {
        console.error('Error loading coffee machines:', err);
        setModalData({
          title: 'Error',
          message: 'Failed to load coffee machines.',
          actionText: 'OK',
          onAction: () => setModalData(null)
        });
      });
  }, []);

  const handleAdd = () => navigate('/AddCoffeeMachine');
  const handleEdit = (machine) => navigate(`/EditCoffeeMachine/${machine.id}`);

  const handleDelete = (id) => {
    setModalData({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this machine?',
      actionText: 'Yes',
      cancelText: 'No',
      onAction: async () => {
        setModalData(null);
        try {
          await axios.delete(`${baseUrl}/delete-coffee-machine/${id}`);
          setMachines(machines.filter(m => m.id !== id));
          setModalData({
            title: 'Deleted',
            message: 'Coffee machine deleted successfully.',
            actionText: 'OK',
            onAction: () => setModalData(null)
          });
        } catch (err) {
          console.error('Error deleting machine:', err);
          setModalData({
            title: 'Error',
            message: 'Failed to delete machine.',
            actionText: 'OK',
            onAction: () => setModalData(null)
          });
        }
      },
      onClose: () => setModalData(null)
    });
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
      setModalData({
        title: 'Error',
        message: 'Failed to update stock.',
        actionText: 'OK',
        onAction: () => setModalData(null)
      });
      return false;
    }
  };

  return (
    <div className="catalog-page coffee-machine-page">
      <div className="header-row">
        <h2 className="catalog-title">Coffee Machines</h2>
        <button onClick={handleAdd} className="add-button large">
          + Add Coffee Machine
        </button>
      </div>

      <div className="table-container">
        {machines.length === 0 ? (
          <div className="no-products">No coffee machines found. Add your first one!</div>
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
              {machines.map((machine) => (
                <tr key={machine.id}>
                  <td>
                    <img
                      src={`data:image/jpeg;base64,${machine.image}`}
                      alt={machine.name}
                      width="50"
                    />
                  </td>
                  <td>{machine.name}</td>
                  <td className="icon-cell">
                    <div className="icon-actions">
                      <Info size={20} color="#8B4513" onClick={() => handleInfo(machine)} title="View Details" />
                      <Pencil size={20} color="#8B4513" onClick={() => handleEdit(machine)} title="Edit" />
                      <Trash2 size={20} color="#8B4513" onClick={() => handleDelete(machine.id)} title="Delete" />
                      <span className="stock-box">
                        {machine.sum_of ?? 0}
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

      <button className="back-button" onClick={() => navigate('/CatalogPage')}>
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
