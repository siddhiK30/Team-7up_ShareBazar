import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // ✅ No token = not logged in
  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // ✅ Check if token is expired
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp && decoded.exp < currentTime) {
      // Token expired - clear it and redirect
      localStorage.removeItem("token");
      return <Navigate to="/auth" state={{ from: location, expired: true }} replace />;
    }
  } catch (error) {
    // Invalid token - clear it and redirect
    localStorage.removeItem("token");
    return <Navigate to="/auth" replace />;
  }

  // ✅ Token valid - render the page
  return children;
};

export default ProtectedRoute;