// src/components/TodoList.jsx

import { useContext } from 'react';
import { TodoContext } from '../state/todoContext';
import { TodoListItem } from './TodoListItem';
import { updateTodo, deleteTodo } from '../api/todoApi';

export const TodoList = () => {
  const { todos, dispatch } = useContext(TodoContext);

  const handleToggle = async (id) => {
    const todo = todos.find(t => t.id === id);
    console.log('[TOGGLE] Clicked todo:', todo);

    const updated = await updateTodo(id, { completed: !todo.completed });
    console.log('[TOGGLE] Updated from server:', updated);

    dispatch({ type: 'modify', payload: updated });
  };

  const handleModify = async (todo) => {
    const updated = await updateTodo(todo.id, { task: todo.task });
    dispatch({ type: 'modify', payload: updated });
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    dispatch({ type: 'delete', payload: id });
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          handleToggle={handleToggle}
          handleModify={handleModify}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
