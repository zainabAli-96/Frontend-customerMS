import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Navigate to="/customers" />
              </ProtectedRoute>
            } />
            
            <Route path="/customers" element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            } />
            
            <Route path="/customers/:id" element={
              <ProtectedRoute>
                <CustomerDetail />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;