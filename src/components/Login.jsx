import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  if (AuthService.isAuthenticated()) {
    return <Navigate to="/" />;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    
    setLoading(true);
    
    try {
      await AuthService.login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="customer-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;