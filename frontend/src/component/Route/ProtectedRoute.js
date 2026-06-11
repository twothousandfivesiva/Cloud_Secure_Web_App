import React from "react";
import { useSelector } from "react-redux";
import { Navigate,useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
 const location = useLocation();

  if (loading) return null; // or return a loader/spinner

  if (isAuthenticated===false) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isAdmin==true && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
