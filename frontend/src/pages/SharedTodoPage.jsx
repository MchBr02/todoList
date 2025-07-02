// frontend/src/pages/SharedTodoPage.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export const SharedTodoPage = () => {
  const { shareId } = useParams();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/share/${shareId}`);
        const text = await res.text(); // najpierw raw tekst
        console.log('[SHARE FETCH] Raw response:', text);
  
        const data = JSON.parse(text);
        console.log('[SHARE FETCH] Parsed JSON:', data);

        if (!Array.isArray(data)) {
          throw new Error(data.message || 'Unexpected response');
        }

        setTodos(data);
      } catch (err) {
        console.error('[SHARE FETCH ERROR]', err);
        setError('Could not load shared todos.');
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, [shareId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Shared Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};
