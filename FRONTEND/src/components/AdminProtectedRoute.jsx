import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("adminToken"); // ✅ Separate admin token

  // No token = not logged in as admin
  if (!token) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // Check if token is valid & not expired
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // ✅ Token expired
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("adminToken");
      return (
        <Navigate
          to="/admin"
          state={{ from: location, expired: true }}
          replace
        />
      );
    }

    // ✅ Check if user has admin role (optional - depends on your JWT)
    const role = decoded.role || decoded.authority || decoded.roles;
    if (role && !String(role).toLowerCase().includes("admin")) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/admin" state={{ unauthorized: true }} replace />;
    }
  } catch (error) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin" replace />;
  }

  // ✅ Valid admin - render page
  return children;
};

export default AdminProtectedRoute;