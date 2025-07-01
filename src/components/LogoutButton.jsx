// src/components/LogoutButton.jsx

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};
