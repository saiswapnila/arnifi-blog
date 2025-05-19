const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', userRoutes); // signup/login
app.use('/api/blogs', blogRoutes); // blog routes (auth handled per route)

// Test route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

module.exports = app;
