import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/customers';

const CustomerService = {
  getCustomers: async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          ...AuthService.getAuthHeader(),
        }
      });
      if (response.status === 401) {
        AuthService.logout();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      if (!response.ok) throw new Error('Failed to fetch customers');
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },
  
  getCustomer: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          ...AuthService.getAuthHeader(),
        }
      });
      if (response.status === 401) {
        AuthService.logout();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      if (!response.ok) throw new Error('Failed to fetch customer');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  },
  
  createCustomer: async (customerData) => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),
        },
        body: JSON.stringify(customerData),
      });
      if (response.status === 401) {
        AuthService.logout();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      if (!response.ok) throw new Error('Failed to create customer');
      return await response.json();
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },
  
  updateCustomer: async (id, customerData) => {
    try {
      const response = await fetch(`${API_URL}/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader(),

        },
        body: JSON.stringify(customerData),
      });
      if (response.status === 401) {
        AuthService.logout();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      if (!response.ok) throw new Error('Failed to update customer');
      return await response.json();
    } catch (error) {
      console.error(`Error updating customer ${id}:`, error);
      throw error;
    }
  },
  
  deleteCustomer: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          ...AuthService.getAuthHeader(),
        },
      });
      
      if (response.status === 401) {
        AuthService.logout();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.'); 
      }
      
      if (!response.ok) throw new Error('Failed to delete customer');
      
      if (response.status === 204) {
        return { success: true, message: 'Customer deleted successfully' };
      }
      try {
        return await response.json();
      } catch (e) {
        return { success: true, message: 'Customer deleted successfully' };
      }
    } catch (error) {
      console.error(`Error deleting customer ${id}:`, error);
      throw error;
    }
  },
};

export default CustomerService;