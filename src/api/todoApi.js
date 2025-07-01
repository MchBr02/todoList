// src/api/todoApi.js

import { getToken } from '../utils/authToken';
import { apiClient } from './apiClient';

const authHeader = () => {
  const stored = getToken();
  return {
    Authorization: `Bearer ${stored?.token}`,
  };
};

export const fetchTodos = () =>
  apiClient('/api/todos', { headers: authHeader() });

export const addTodo = (todo) =>
  apiClient('/api/todos', {
    method: 'POST',
    headers: authHeader(),
    body: todo,
  });

export const updateTodo = (id, todo) =>
  apiClient(`/api/todos/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: todo,
  });

export const deleteTodo = (id) =>
  apiClient(`/api/todos/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });

export const clearCompleted = () =>
apiClient('/api/todos/completed', {
  method: 'DELETE',
  headers: authHeader(),
});

export const updateShareSetting = (enabled) =>
apiClient('/api/auth/share', {
  method: 'PUT',
  body: { enabled },
});