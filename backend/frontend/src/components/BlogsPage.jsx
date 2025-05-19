import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("userId");

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          author: selectedAuthor,
          category: selectedCategory,
        },
      });
      setBlogs(res.data);
    } catch (err) {
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const uniqueAuthors = Array.from(
        new Set(res.data.map((blog) => blog.author._id))
      ).map((id) => {
        const blog = res.data.find((b) => b.author._id === id);
        return { id, name: blog.author.username };
      });

      const uniqueCategories = Array.from(
        new Set(res.data.map((blog) => blog.category))
      );

      setAuthors(uniqueAuthors);
      setCategories(uniqueCategories);
    } catch (err) {
      console.log("Error fetching filter data");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedAuthor, selectedCategory]);

  useEffect(() => {
    fetchFilters();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      <div className="flex gap-4 mb-6">
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-sm text-gray-600">
                By: {blog.author.username} | Category: {blog.category}
              </p>
              {blog.image && (
                <img
                  src={`https://arnifi-blog-dgls.onrender.com/${blog.image}`}
                  alt="Blog"
                  className="w-full max-w-md mt-2"
                />
              )}
              <p>{blog.content}</p>

              {loggedInUserId === blog.author._id && (
                <button
                  onClick={() => navigate(`/edit-blog/${blog._id}`)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogsPage;
