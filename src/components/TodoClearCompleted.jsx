// src/components/TodoClearCompleted.jsx

import { useContext, useEffect, useState } from "react";
import { TodoContext } from "state/todoContext";

export const TodoClearCompleted = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isAnyTodoCompleted = todos.some((todo) => todo.status === true);
    setVisible(isAnyTodoCompleted);
  }, [todos]);

  const handleClearCompleted = () => {
    dispatch({
      type: "clear",
    });
  };

  return (
    <>
      {visible && (
        <div className="todo-list__options">
          <button
            className="todo-list__options__button"
            onClick={handleClearCompleted}
          >
            Clear completed tasks
          </button>
        </div>
      )}
    </>
  );
};
