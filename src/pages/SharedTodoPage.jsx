import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SharedTodoPage = () => {
  const { shareId } = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const res = await fetch(`/api/share/${shareId}`);
      const data = await res.json();
      setTodos(data);
    };
    loadTodos();
  }, [shareId]);

  return (
    <div>
      <h1>Shared Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};
