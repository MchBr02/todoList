// frontend/src/api/authApi.js

import { apiClient } from './apiClient';

export const registerUser = (email, password) =>
  apiClient('/api/auth/register', {
    method: 'POST',
    body: { email, password },
  });

export const loginUser = (email, password) =>
  apiClient('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  