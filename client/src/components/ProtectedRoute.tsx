import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
