import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useGuard } from '../hooks/useGuard';

const ProtectedRoute = ({ element, ...rest }) => {
  const { authorized, loading } = useGuard();

  if (loading) {
    return <div>Loading...</div>;
  }

  return authorized ? <Route {...rest} element={element} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
