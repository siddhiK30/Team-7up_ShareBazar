import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // If token is valid and not expired, redirect to explore
      if (decoded.exp && decoded.exp > currentTime) {
        return <Navigate to="/explore" replace />;
      }
    } catch {
      // Invalid token, let them see login page
      localStorage.removeItem("token");
    }
  }

  return children;
};

export default PublicRoute;