// src/auth/LoginPage.jsx

import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const LoginPage = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (user?.token) {
    return <Navigate to="/todos" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      if (result.token) {
        console.log('✅ Login successful, navigating...');
        navigate('/todos');
      } else {
        alert(result.message || 'Invalid credentials');
      }
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      <p>No account? <Link to="/register">Register</Link></p>
    </form>
  );
};
