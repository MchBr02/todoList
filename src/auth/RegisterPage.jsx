// src/auth/RegisterPage.js

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './useAuth';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await register(email, password);
      if (data.message === 'Registered') {
        alert('Registration successful! You can now log in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
      <p>Already created account? <Link to="/login">Login</Link></p>
    </form>
  );
};
