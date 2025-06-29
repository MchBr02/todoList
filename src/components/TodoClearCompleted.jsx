import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../state/todoContext';
import { clearCompleted } from '../api/todoApi';

export const TodoClearCompleted = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anyCompleted = todos.some(t => t.completed === true);
    setVisible(anyCompleted);
  }, [todos]);

  const handleClearCompleted = async () => {
    await clearCompleted();
    dispatch({ type: 'clear' });
  };

  return (
    <>
      {visible && (
        <div className="todo-list__options">
          <button className="todo-list__options__button" onClick={handleClearCompleted}>
            Clear completed tasks
          </button>
        </div>
      )}
    </>
  );
};
