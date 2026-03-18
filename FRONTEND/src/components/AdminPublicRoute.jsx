import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminPublicRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // If admin token valid, redirect to dashboard
      if (decoded.exp && decoded.exp > currentTime) {
        return <Navigate to="/admin/dashboard" replace />;
      }
    } catch {
      localStorage.removeItem("adminToken");
    }
  }

  return children;
};

export default AdminPublicRoute;