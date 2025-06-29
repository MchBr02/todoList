// src/components/TodoListItem.jsx

import { useEffect, useRef, useState } from "react";
import { BiSave, BiBlock, BiPencil, BiTrash } from "react-icons/bi";
import { useForm } from "hooks/useForm";

export const TodoListItem = ({
  todo,
  handleToggle,
  handleModify,
  handleDelete,
}) => {
  const [editMode, setEditMode] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    if (editMode) inputRef.current.focus();
  }, [editMode]);

  const [inputValue, handleInputChange, reset] = useForm(todo);
  const { task } = inputValue;

  const handleToggleEdit = (save = false) => {
    save ? handleModify(inputValue) : reset();
    setEditMode(!editMode);
  };

  return (
    <li
      className={`todo-list__item ${
        todo.status ? "todo-list__item--completed" : ""
      } ${editMode ? "todo-list__item--editing" : ""}`}
    >
      {!editMode && (
        <p className="todo-list__p" onClick={() => handleToggle(todo.id)}>
          {todo.task}
        </p>
      )}

      <input
        autoComplete="off"
        className="todo-list__input"
        type="text"
        name="task"
        placeholder="Edit task..."
        hidden={!editMode}
        ref={inputRef}
        value={task}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === "Enter" && handleToggleEdit(true)}
      />
      <div className="todo-list__buttons">
        {editMode ? (
          <>
            <BiSave
              className="todo-list__button"
              onClick={() => handleToggleEdit(true)}
            />
            <BiBlock
              className="todo-list__button"
              onClick={() => handleToggleEdit(false)}
            />
          </>
        ) : (
          <>
            <BiPencil
              className="todo-list__button"
              onClick={() => handleToggleEdit(false)}
            />
            <BiTrash
              className="todo-list__button"
              onClick={() => handleDelete(todo.id)}
            />
          </>
        )}
      </div>
    </li>
  );
};
