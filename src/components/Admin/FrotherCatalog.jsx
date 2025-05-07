import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogPage.css';
import { Info, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';

export default function FrotherCatalog() {
  const [frothers, setFrothers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/get-all-milk-frothers`) 
      .then(res => setFrothers(res.data))
      .catch(err => {
        console.error('❌ Error loading milk frothers:', err);
        alert('Failed to load milk frothers');
      });
  }, []);

  const handleAdd = () => alert('Add new milk frother');
  const handleEdit = (frother) => navigate(`/EditFrother/${frother.id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this frother?')) {
      axios.delete(`${baseUrl}/delete-milk-frother/${id}`)
        .then(() => setFrothers(frothers.filter(f => f.id !== id)));
    }
  };
  const handleInfo = (frother) => {
    alert(
      `Name: ${frother.name}\nColor: ${frother.color}\nType: ${frother.frothing_type}\nCapacity: ${frother.capacity}\nPrice: ${frother.price} ₪`
    );
  };

  return (
    <div className="catalog-page">
      <div className="header-row">
        <h2>🥛 Milk Frothers</h2>
        <button onClick={handleAdd} className="add-button">+ Add Frother</button>
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
              <td><img src={frother.image_path} alt={frother.name} width="50" /></td>
              <td>{frother.name}</td>
              <td className="icon-cell">
                <Info color="#8B4513" style={{ cursor: 'pointer' }} onClick={() => handleInfo(frother)} />
                <Pencil color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleEdit(frother)} />
                <Trash2 color="#8B4513" style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => handleDelete(frother.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
