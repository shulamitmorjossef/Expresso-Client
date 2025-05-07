
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import { Info, Pencil, Trash2 } from 'lucide-react';

export default function CoffeeCatalog() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/get-all-coffee-machines')   
      .then(res => setMachines(res.data))
      .catch(err => {
        console.error('❌ Error loading coffee machines:', err);
        alert('Failed to load coffee machines');
      });
  }, []);

  const handleAdd = () => alert('Add new coffee machine');
  const handleEdit = (machine) => alert(`Edit ${machine.name}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this machine?')) {
      axios.delete(`http://localhost:3000/delete-coffee-machine/${id}`)
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
        <h2>☕ Coffee Machines</h2>
        <button onClick={handleAdd} className="add-button">+ Add Coffee Machine</button>
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