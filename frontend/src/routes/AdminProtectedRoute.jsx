import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const adminToken = localStorage.getItem('adminToken');
  
  if (adminToken !== 'admin-authenticated') {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;