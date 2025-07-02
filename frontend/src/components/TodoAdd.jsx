// frontend/src/components/TodoAdd.jsx

import { useState, useContext } from 'react';
import { TodoContext } from '../state/todoContext';
import { addTodo } from '../api/todoApi';

export const TodoAdd = () => {
  const [task, setTask] = useState('');
  const { dispatch } = useContext(TodoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newTodo = await addTodo({ task });
    dispatch({ type: 'add', payload: newTodo });
    setTask('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form__input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add new task..."
      />
      <button className="form__button" type="submit">+</button>
    </form>
  );
};
