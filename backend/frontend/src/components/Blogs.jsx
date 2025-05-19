import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h3>{blog.title}</h3>
              <p>By: {blog.authorName}</p>
              <p>{blog.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
