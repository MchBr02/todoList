import { useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/authToken';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = getToken();
    if (stored) setUser({ token: stored });
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      setUser({ token: data.token, shareId: data.shareId });
    }
    return data;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return { user, login, logout };
};
