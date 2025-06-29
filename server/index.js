const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = process.env.JWT_SECRET || 'secretkey';

// In-memory user store
let users = [];

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Registration
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), email, passwordHash: hash, todos: [], shareId: uuidv4() };
  users.push(user);
  res.status(201).json({ message: 'Registered' });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id }, SECRET);
  res.json({ token, shareId: user.shareId });
});

// Todos CRUD
app.get('/api/todos', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  res.json(user.todos);
});

app.post('/api/todos', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  const todo = { id: uuidv4(), task: req.body.task || '', completed: false };
  user.todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  const todo = user.todos.find(t => t.id === req.params.id);
  if (!todo) return res.sendStatus(404);
  if (req.body.task !== undefined) todo.task = req.body.task;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  res.json(todo);
});

app.delete('/api/todos/:id', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  user.todos = user.todos.filter(t => t.id !== req.params.id);
  res.sendStatus(204);
});

app.delete('/api/todos/completed', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  user.todos = user.todos.filter(t => !t.completed);
  res.sendStatus(204);
});

// Public share
app.get('/api/share/:shareId', (req, res) => {
  const user = users.find(u => u.shareId === req.params.shareId);
  if (!user) return res.sendStatus(404);
  res.json(user.todos);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
