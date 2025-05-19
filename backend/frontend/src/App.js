import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BlogsPage from "./components/BlogsPage";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";
import LogoutButton from "./components/LogoutButton";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-inner max-w-4xl mx-auto my-12 relative overflow-hidden min-h-[70vh]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-200 opacity-60 rounded-lg"></div>

      {/* Content */}
      <div className="relative z-10 text-blue-900 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-pulse">
          Welcome to <span className="text-blue-600">Arnifi Blog ✨</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-800">
          Discover and share amazing stories, thoughts, and experiences. Your voice matters here.
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/blogs"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            View Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 p-4 text-white flex space-x-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/create-blog">Create Blog</Link>
        <LogoutButton />
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <BlogsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-blog"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-blog/:id"
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
