import { Navigate } from "react-router-dom";
<<<<<<< HEAD
 
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
 
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
 
  return children;
};
 
=======

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

>>>>>>> f7a393174bdc420e17332afe3fcc6f323dcd288a
export default ProtectedRoute;