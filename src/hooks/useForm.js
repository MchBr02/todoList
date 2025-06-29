// src/hooks/useForm.js
// A reusable custom hook to handle form state.

import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [inputValue, setInputValue] = useState(initialState);

  const reset = () => {
    setInputValue(initialState);
  };

  const handleInputChange = ({ target }) => {
    setInputValue({
      ...initialState,
      [target.name]: target.value,
    });
  };

  return [inputValue, handleInputChange, reset];
};
