// src/auth/RequireAuth.js

import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  if (!user?.token) {
    console.log('[AUTH GUARD] No token — redirect to /login');
    return <Navigate to="/login" replace />;
  }

  return children;
};
