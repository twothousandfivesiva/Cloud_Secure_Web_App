import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or was moved.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
