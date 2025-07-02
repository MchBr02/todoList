// backend/index.js

const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'secretkey';

// In-memory user store
let users = [];

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  console.log('[AUTH CHECK] Authorization header:', auth);
  if (!auth) return res.status(401).json({ message: 'No token provided' });

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    console.log('[DECODED TOKEN]', decoded);
    console.log('[AUTH CHECK] Token valid for user ID:', decoded.id);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.warn('[JWT VERIFY ERROR]', err.message);
    console.warn('[AUTH CHECK] Invalid token:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Registration
app.post('/api/auth/register', async (req, res) => {
  console.log('[ENDPOINT] POST /api/auth/register');
  console.log('[BODY]', req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    email,
    passwordHash: hash,
    todos: [],
    shareId: uuidv4(),
    shareEnabled: false
  };
  users.push(user);
  res.status(201).json({ message: 'Registered' });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  console.log('[ENDPOINT] POST /api/auth/login');
  console.log('[BODY]', req.body);
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
  res.json({ token, shareId: user.shareId });
});

app.post('/api/todos', authMiddleware, (req, res) => {
  console.log('[ENDPOINT] POST /api/todos | userId:', req.userId);
  console.log('[BODY]', req.body);
  const user = users.find(u => u.id === req.userId);
  const todo = { id: uuidv4(), task: req.body.task || '', completed: false };
  user.todos.push(todo);
  res.status(201).json(todo);
});

// Todos CRUD
app.get('/api/todos', authMiddleware, (req, res) => {
  console.log('[ENDPOINT] GET /api/todos | userId:', req.userId);
  const user = users.find(u => u.id === req.userId);
  res.json(user.todos);
});

// Public share
app.get('/api/share/:shareId', (req, res) => {
  console.log('[ENDPOINT] GET /api/share/:shareId');
  console.log('[PARAMS]', req.params);

  const user = users.find(u => u.shareId === req.params.shareId);
  if (!user) {
    console.warn('[SHARE] User not found for shareId:', req.params.shareId);
    return res.sendStatus(404);
  }

  if (!user.shareEnabled) {
    console.warn('[SHARE] Sharing disabled for user:', user.email);
    return res.status(403).json({ message: 'Sharing is disabled by the user.' });
  }

  console.log(`[SHARE] Returning ${user.todos.length} todos`);
  res.setHeader('Content-Type', 'application/json');
  res.json(user.todos);
});

// Healthcheck
app.get('/api/health', (req, res) => res.send('OK'));

app.delete('/api/todos/completed', authMiddleware, (req, res) => {
  console.log('[ENDPOINT] DELETE /api/todos/completed | userId:', req.userId);
  const user = users.find(u => u.id === req.userId);
  const before = user.todos.length;
  user.todos = user.todos.filter(t => !t.completed);
  const after = user.todos.length;
  console.log(`[TODO DELETE] Removed ${before - after} todos (before: ${before}, after: ${after})`);
  res.sendStatus(204);
});

// Return current status
app.get('/api/auth/share', authMiddleware, (req, res) => {
  console.log('[ENDPOINT] GET /api/auth/share');
  console.log('[AUTH USER ID]', req.userId);
  console.log('[ALL USERS]', users);

  const user = users.find(u => u.id === req.userId);
  console.log('[AUTH CHECK] Matching user:', user);
  if (!user) {
    console.warn('[ERROR] User not found!');
    return res.sendStatus(404);
  }

  res.json({ enabled: user.shareEnabled });
});

app.delete('/api/todos/:id', authMiddleware, (req, res) => {
  console.log('[ENDPOINT] DELETE /api/todos/:id | userId:', req.userId);
  console.log('[PARAMS]', req.params);
  const user = users.find(u => u.id === req.userId);
  user.todos = user.todos.filter(t => t.id !== req.params.id);
  res.sendStatus(204);
});

app.put('/api/todos/:id', authMiddleware, (req, res) => {
  console.log('[ENDPOINT] PUT /api/todos/:id | userId:', req.userId);
  console.log('[PARAMS]', req.params);
  console.log('[BODY]', req.body);
  const user = users.find(u => u.id === req.userId);
  const todo = user.todos.find(t => t.id === req.params.id);
  if (!todo) {
    console.warn('[TODO UPDATE] Todo not found:', req.params.id);
    return res.sendStatus(404);
  }
  if (req.body.task !== undefined) todo.task = req.body.task;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  console.log('[TODO UPDATED]', todo);
  res.json(todo);
});

 // Toggle sharing
app.put('/api/auth/share', authMiddleware, (req, res) => {
  console.log('[ENDPOINT] PUT /api/auth/share | userId:', req.userId);
  const { enabled } = req.body;

  const user = users.find(u => u.id === req.userId);
  if (typeof enabled !== 'boolean') {
    return res.status(400).json({ message: 'Missing or invalid "enabled" boolean.' });
  }

  user.shareEnabled = enabled;
  console.log(`[SHARE SET] userId: ${user.id} | enabled: ${enabled}`);
  res.status(200).json({ message: 'Share setting updated' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});


