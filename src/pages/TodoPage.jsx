import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoReducer } from '../state/todoReducer';
import { TodoContext } from '../state/todoContext';
import { TodoAdd } from '../components/TodoAdd';
import { TodoList } from '../components/TodoList';
import { TodoClearCompleted } from '../components/TodoClearCompleted';
import { fetchTodos } from '../api/todoApi';
import { useAuth } from '../auth/useAuth';

export const TodoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const load = async () => {
      const data = await fetchTodos();
      dispatch({ type: 'load', payload: data });
    };
    load();
  }, [user, navigate]);

  const shareUrl = user ? `${window.location.origin}/share/${user.shareId}` : '';

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      <main className="card">
        <h1 className="card__title">Todo List</h1>
        {user && (
          <p>
            Share link: <a href={shareUrl}>{shareUrl}</a>
          </p>
        )}
        <TodoAdd />
        <hr />
        <TodoList />
        <TodoClearCompleted />
      </main>
    </TodoContext.Provider>
  );
};
