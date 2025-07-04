// frontend/src/state/todoReducer.js

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'load':
      return action.payload;
    case 'add':
      return [...state, action.payload];

    case 'delete':
      return state.filter((todo) => todo.id !== action.payload);

    case 'modify':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );

    case 'clear':
      return state.filter((todo) => !todo.completed);

    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );

    default:
      return state;
  }
};
