
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import { Info, Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';


export default function CoffeeCatalog() {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${baseUrl}/get-all-coffee-machines`)   
      .then(res => {
        console.log('📷 Response from server:', res.data); // ← הוסיפי את זה כאן
        setMachines(res.data);
      })
      .catch(err => {
        console.error('❌ Error loading coffee machines:', err);
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
    alert(
      `Name: ${machine.name}\nColor: ${machine.color}\nCapacity: ${machine.capacity}\nPrice: ${machine.price} ₪`
    );
  };

  return (
    <div className="catalog-page">
      <div className="header-row">
        <h2>Coffee Machine</h2>
        <button onClick={handleAdd} className="add-button">
          <Plus size={16} style={{ marginRight: 5 }} />
          Add Coffee machine
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
              <td><img src={machine.image_path} alt={machine.name} width="50" /></td>
              <td>{machine.name}</td>
              <td className="icon-cell">
                <Info color="#8B4513" style={{ cursor: 'pointer' }} onClick={() => handleInfo(machine)} />
                <Pencil color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleEdit(machine)} />
                <Trash2 color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleDelete(machine.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}