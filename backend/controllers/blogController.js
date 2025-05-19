const Blog = require('../models/blog');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const author = req.user.id; // from auth middleware

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' });
    }

    let image = '';
    if (req.file) {
      image = req.file.filename;  // multer puts uploaded file info in req.file
    }

    const blog = new Blog({ title, content, category, image, author });
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all blogs, optionally filtered by category or author via query params
exports.getAllBlogs = async (req, res) => {
  try {
    const filter = {};
    const { category, author } = req.query;

    if (category) {
      filter.category = category;
    }

    if (author) {
      filter.author = author;
    }

    const blogs = await Blog.find(filter)
      .populate('author', 'username email')  // populate author details
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get blogs authored by logged-in user
exports.getMyBlogs = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update blog by ID - only author allowed to update
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    const { title, content, category } = req.body;

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (category) blog.category = category;

    // if a new image is uploaded, update the image filename
    if (req.file) {
      blog.image = req.file.filename;
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete blog by ID - only author allowed to delete
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(blog._id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
