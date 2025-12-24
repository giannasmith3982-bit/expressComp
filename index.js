const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Express API on Shiper!');
});

// Example API endpoint
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  res.json(users);
});

// Example POST endpoint
app.post('/api/users', (req, res) => {
  const user = req.body;
  // In real apps, you would save to DB
  res.status(201).json({ message: 'User created', user });
});

// Listen on Shiper port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
