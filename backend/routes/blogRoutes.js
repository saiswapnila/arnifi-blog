const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} = require('../controllers/blogController');

const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');  // multer middleware for handling file uploads

// Public routes
router.get('/', getAllBlogs);               // Get all blogs, supports query filters author/category
router.get('/my-blogs', verifyToken, getMyBlogs);  // Get logged-in user's blogs
router.get('/:id', getBlogById);

// Protected routes (need token)
router.post('/', verifyToken, upload.single('image'), createBlog);  // create blog with optional image upload
router.put('/:id', verifyToken, upload.single('image'), updateBlog); // update blog with optional image upload
router.delete('/:id', verifyToken, deleteBlog);

module.exports = router;
