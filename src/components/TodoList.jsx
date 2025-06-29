// src/components/TodoList.jsx

import { useContext } from "react";
import { TodoContext } from "state/todoContext";
import { TodoListItem } from "components/TodoListItem";

export const TodoList = () => {
  const { todos, dispatch } = useContext(TodoContext);

  const handleToggle = (todoId) => {
    dispatch({
      type: "toggle",
      payload: todoId,
    });
  };

  const handleModify = (todo) => {
    if (todo.task.trim().length === 0) return

    dispatch({
      type: "modify",
      payload: todo,
    });
  };

  const handleDelete = (todoId) => {
    dispatch({
      type: "delete",
      payload: todoId,
    });
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
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
