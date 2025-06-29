// src/state/todoReducer.js
// Reducer function for todo actions (add, delete, modify, toggle, clear).

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "delete":
      return state.filter((todo) => todo.id !== action.payload);

    case "modify":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, task: action.payload.task }
          : todo
      );

    case "clear":
      return state.filter((todo) => todo.status !== true);

    case "toggle":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, status: !todo.status } : todo
      );

    default:
      return state;
  }
};
