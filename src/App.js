import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './auth/LoginPage';
import { RegisterPage } from './auth/RegisterPage';
import { TodoPage } from './pages/TodoPage';
import { SharedTodoPage } from './pages/SharedTodoPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/share/:shareId" element={<SharedTodoPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
