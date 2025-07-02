// src/hooks/useForm.js
// A reusable custom hook to handle form state.

import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [inputValue, setInputValue] = useState(initialState);

  console.log('[useForm] Initialized with:', initialState);

  const reset = () => {
    console.log('[useForm] Resetting to initial state:', initialState);
    setInputValue(initialState);
  };

  const handleInputChange = ({ target }) => {
    const updatedValue = {
      ...inputValue,
      [target.name]: target.value,
    };

    console.log(`[useForm] Changing "${target.name}" to:`, target.value);
    console.log('[useForm] New input value:', updatedValue);

    setInputValue(updatedValue);
  };

  return [inputValue, handleInputChange, reset];
};
