// frontend/src/auth/AuthProvider.js

import { AuthContext } from './AuthContext';
import { useProvideAuth } from './useAuth';

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
