import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("Token in PrivateRoute:", token);
  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }
  // Logged in, allow access
  return children;
};

export default PrivateRoute;
