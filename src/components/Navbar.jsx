import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Customer Management
        </Link>
        
        <div className="navbar-user">
          {currentUser ? (
            <>
              <span className="navbar-username">Welcome, {currentUser.username}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;