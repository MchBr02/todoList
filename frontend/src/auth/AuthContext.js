// frontend/src/auth/AuthContext.js

import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);
