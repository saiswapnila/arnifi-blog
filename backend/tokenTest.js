require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI5Zjk5NmE0ZWI4YjVlMjljYzdiY2YiLCJpYXQiOjE3NDc1ODg5MzksImV4cCI6MTc0NzU5MjUzOX0.4nHVRpAw2Vl5lRlbWFjknUiXSl61HhJNK4YPQDC72hY';

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Token is valid. Decoded payload:', decoded);
} catch (err) {
  console.error('Token invalid:', err.message);
}
