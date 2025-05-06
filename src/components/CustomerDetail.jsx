import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/CustomerService';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewCustomer = id === 'new';
  
  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    birth_date: '', 
    registeredOn: null
  });
  
  const [loading, setLoading] = useState(!isNewCustomer);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(isNewCustomer);

  // Load customer data if not creating a new one
  useEffect(() => {
    if (!isNewCustomer) {
      const fetchCustomer = async () => {
        try {
          setLoading(true);
          const data = await api.getCustomer(id);
          if (data.birth_date) {
            const dateObj = new Date(data.birth_date);
            if (!isNaN(dateObj.getTime())) {
              data.birth_date = dateObj.toISOString().split('T')[0];
            }
          }
          setCustomer(data);
          setError(null);
        } catch (err) {
          setError('Failed to load customer details. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchCustomer();
    }
  }, [id, isNewCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isNewCustomer) {
        await api.createCustomer(customer);
      } else {
        await api.updateCustomer(id, customer);
      }
      
      if (isNewCustomer) {
        navigate('/');
      } else {
        setIsEditing(false);
      }
      
      setError(null);
    } catch (err) {
      setError(`Failed to ${isNewCustomer ? 'create' : 'update'} customer. Please try again.`);
      console.error(err);
    }
  };

  // Handle customer deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.deleteCustomer(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete customer. Please try again.');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    if (isNewCustomer || !isEditing) {
      navigate('/');
    } else {
      setIsEditing(false);
    }
  };

  if (loading) return <div className="loading">Loading customer details...</div>;

  return (
    <div className="customer-detail-container">
      <div className="customer-detail-header">
        <h1>{isNewCustomer ? 'Add New Customer' : isEditing ? 'Edit Customer' : 'Customer Details'}</h1>
        {!isNewCustomer && !isEditing && (
          <div className="action-buttons">
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
           <button className="delete-button"  style={{ marginLeft: '8px' }} onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-row1">
        <div className="form-group half-width">
          <label htmlFor="name">First name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={customer.first_name}
            onChange={handleChange}
            required
            disabled={!isEditing}
          />
        </div>
        <div className="form-group half-width">
          <label htmlFor="name">Last name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={customer.last_name}
            onChange={handleChange}
            required
            disabled={!isEditing}
          />
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
            disabled={!isEditing}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
            disabled={!isEditing}
         />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={customer.address || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="birth_date">Birth Date</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={customer.birth_date || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        
        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
        
        {!isEditing && (
          <button type="button" className="back-button" onClick={handleCancel}>
            Back to List
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomerDetail;