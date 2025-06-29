// src/pages/TodoPage.jsx

import { useEffect, useReducer } from "react";
import { todoReducer } from "state/todoReducer";
import { TodoContext } from "state/todoContext";
import { TodoAdd } from "components/TodoAdd";
import { TodoList } from "components/TodoList";
import { TodoClearCompleted } from "components/TodoClearCompleted";
import { initialData } from "consts/initialData";

export const TodoPage = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], initialData);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      <main className="card">
        <h1 className="card__title">Todo List</h1>
        <TodoAdd />
        <hr />
        <TodoList />
        <TodoClearCompleted />
      </main>
    </TodoContext.Provider>
  );
};
