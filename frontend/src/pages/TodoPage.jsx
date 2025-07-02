// frontend/src/pages/TodoPage.jsx

import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoReducer } from '../state/todoReducer';
import { TodoContext } from '../state/todoContext';
import { TodoAdd } from '../components/TodoAdd';
import { TodoList } from '../components/TodoList';
import { TodoClearCompleted } from '../components/TodoClearCompleted';
import {
  fetchTodos,
  updateShareSetting,
  fetchShareSetting,
} from '../api/todoApi';
import { useAuth } from '../auth/useAuth';
import { LogoutButton } from '../components/LogoutButton';

export const TodoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [showShareLink, setShowShareLink] = useState(false);
  const [shareLoading, setShareLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      console.log('[TODO PAGE] No user. Redirecting to login...');
      navigate('/login');
      return;
    }

    console.log('[TODO PAGE] User detected:', user);

    const load = async () => {
      try {
        console.log('[TODO PAGE] Fetching todos...');
        const data = await fetchTodos();
        console.log('[TODO PAGE] Todos loaded:', data);
        dispatch({ type: 'load', payload: data });
      } catch (err) {
        console.error('[TODO LOAD ERROR]', err.message);
      }

      try {
        console.log('[TODO PAGE] Fetching share setting...');
        const { enabled } = await fetchShareSetting();
        console.log('[TODO PAGE] Share setting from server:', enabled);
        setShowShareLink(Boolean(enabled));
        console.log('[SHARE] Initial state from server:', enabled);
      } catch (err) {
        console.warn('[SHARE] Could not fetch share flag:', err.message);
      } finally {
        setShareLoading(false);
      }
    };

    load();
  }, [user, navigate]);

  const shareUrl = user
    ? `${window.location.origin}/share/${user.shareId}`
    : '';

  const displayUrl = showShareLink ? (
    <a href={shareUrl}>{shareUrl}</a>
  ) : (
    <span>-</span>
  );

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      <main className="card">
        <h1 className="card__title">Todo List</h1>

        {user && (
          <>
            <p>
              <input
                type="checkbox"
                id="shareLink"
                checked={!!showShareLink}
                disabled={shareLoading}
                onChange={async (e) => {
                  const newValue = e.target.checked;
                  setShowShareLink(newValue);
                  try {
                    await updateShareSetting(newValue);
                    console.log(`[SHARE] Updated to ${newValue}`);
                  } catch (err) {
                    console.error('[SHARE] Failed to update setting', err);
                  }
                }}
              />{' '}
              Share link: {displayUrl}
            </p>
            <p>
              <LogoutButton />
            </p>
          </>
        )}

        <TodoAdd />
        <hr />
        <TodoList />
        <TodoClearCompleted />
      </main>
    </TodoContext.Provider>
  );
};
