import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      alert('Please enter title, category, and content');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a blog');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await api.post('/api/blogs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Blog created successfully!');
      navigate('/blogs');
    } catch (error) {
      alert('Error creating blog: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl mb-4">Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-semibold">Title</label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-1 font-semibold">Category</label>
          <input
            id="category"
            type="text"
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-1 font-semibold">Image (optional)</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-1 font-semibold">Content</label>
          <textarea
            id="content"
            rows={6}
            className="w-full p-2 border rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
