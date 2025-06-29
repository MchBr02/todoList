// src/components/TodoAdd.jsx

import { useContext } from "react";
import { useForm } from "hooks/useForm";
import { TodoContext } from "state/todoContext";

export const TodoAdd = () => {
  const [{ task }, handleInputChange, reset] = useForm({
    task: "",
  });

  const { dispatch } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim().length === 0) {
      return;
    }

    const todo = {
      id: Date.now(),
      task,
      status: false,
    };

    dispatch({
      type: "add",
      payload: todo,
    });

    reset();
  };

  return (
    <form className="form">
      <input
        autoComplete="off"
        className="form__input"
        type="text"
        name="task"
        placeholder="Add new task..."
        value={task}
        onChange={handleInputChange}
      />
      <button className="form__button" type="submit" onClick={handleSubmit}>
        +
      </button>
    </form>
  );
};
