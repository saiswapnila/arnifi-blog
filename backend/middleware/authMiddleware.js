const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; // Use 'id' key to match controller usage
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = { verifyToken };
