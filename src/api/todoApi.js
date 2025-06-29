import { getToken } from '../utils/authToken';

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const fetchTodos = async () => {
  const res = await fetch('/api/todos', { headers: headers() });
  return res.json();
};

export const addTodo = async (todo) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const updateTodo = async (id, todo) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  await fetch(`/api/todos/${id}`, { method: 'DELETE', headers: headers() });
};

export const clearCompleted = async () => {
  await fetch('/api/todos/completed', { method: 'DELETE', headers: headers() });
};
