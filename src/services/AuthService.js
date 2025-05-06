const API_URL = 'http://localhost:8080/auth';

const AuthService = {
  login: async (username, password) => {
    try {
      const encodedCredentials = btoa(`${username}:${password}`);
      
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('auth', encodedCredentials);
        localStorage.setItem('user', JSON.stringify({
          username: data.username
        }));
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('auth') !== null && localStorage.getItem('user') !== null;
  },
  
  getAuthHeader: () => {
    const auth = localStorage.getItem('auth');
    
    if (auth) {
      return {
        'Authorization': `Basic ${auth}`
      };
    } else {
      return {};
    }
  }
};

export default AuthService;