// src/auth/useAuth.js

import { useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/authToken';
import { apiClient } from '../api/apiClient';
import { useAuthContext } from './AuthContext';
export const useAuth = useAuthContext;

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = getToken();
    console.log('[AUTH INIT] Token from storage:', stored);
  
    if (stored?.token) {
      setUser({ token: stored.token, shareId: stored.shareId });
      console.log('[AUTH INIT] User restored from token');
    } else {
      console.log('[AUTH INIT] No valid token found');
    }
  }, []);

  const login = async (email, password) => {
    console.log('[AUTH LOGIN] Attempting login for', email);
  
    const data = await apiClient('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  
    if (data.token) {
      console.log('[AUTH LOGIN] Login successful, saving token...');
      setToken(data.token, data.shareId);
      setUser({ token: data.token, shareId: data.shareId });
    } else {
      console.warn('[AUTH LOGIN] Login failed:', data.message);
    }
  
    return data;
  };
  
  const register = async (email, password) => {
    console.log('[AUTH REGISTER] Registering user:', email);
  
    const res = await apiClient('/api/auth/register', {
      method: 'POST',
      body: { email, password },
    });
  
    console.log('[AUTH REGISTER] Response:', res);
    return res;
  };

  const logout = () => {
    console.log('[AUTH LOGOUT] Logging out user');
    removeToken();
    setUser(null);
  };

  return { user, login, logout, register };
};
