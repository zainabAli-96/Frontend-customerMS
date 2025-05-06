import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/CustomerService';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await api.getCustomers();
        setCustomers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load customers. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
  
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const result = await api.deleteCustomer(id);
        setCustomers(customers.filter(customer => customer.id !== id));
        
      } catch (err) {
        console.error('Error deleting customer:', err);
        setError('Failed to delete customer. Please try again.');
      }
    }
  };
  const handleAddNew = () => {
    navigate('/customers/new');
  };

  const handleRowClick = (id) => {
    navigate(`/customers/${id}`);
  };

  if (loading) return <div className="loading">Loading customers...</div>;
  
  return (
    <div className="customer-list-container">
      <div className="customer-list-header">
        <h1>Customers List</h1>
        <button className="add-button" onClick={handleAddNew}>
          Add New Customer
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {customers.length === 0 ? (
        <div className="no-customers">No customers found. Add a new customer to get started.</div>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} onClick={() => handleRowClick(customer.id)}>
                <td>{customer.id}</td>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button className="delete-button" onClick={(e) => handleDelete(customer.id, e)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;