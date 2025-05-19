import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();  // blog id from URL param
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // for new uploaded file

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch existing blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.title);
        setCategory(res.data.category);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        setError("Failed to load blog");
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submit for update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMsg("Blog updated successfully!");
      setError("");
      // Optionally redirect after delay
      setTimeout(() => {
        navigate("/my-blogs");  // or wherever you want
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      setSuccessMsg("");
    }
  };

  if (loading) return <p>Loading blog data...</p>;

  return (
    <div>
      <h2>Edit Blog</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Upload New Image (optional):</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
