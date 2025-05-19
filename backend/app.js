const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://arnifi-blog-rho.vercel.app',
  'https://arnifi-blog-daaf01hkw-sai-swapnila-naiks-projects.vercel.app',
  // add more deployed frontend URLs if needed
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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
