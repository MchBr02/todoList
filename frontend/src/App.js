// frontend/src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './auth/LoginPage';
import { RegisterPage } from './auth/RegisterPage';
import { TodoPage } from './pages/TodoPage';
import { SharedTodoPage } from './pages/SharedTodoPage';
import { AuthProvider } from './auth/AuthProvider';
import { RequireAuth } from './auth/RequireAuth';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/todos"
            element={
              <RequireAuth>
                <TodoPage />
              </RequireAuth>
            }
          />
          <Route path="/share/:shareId" element={<SharedTodoPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
