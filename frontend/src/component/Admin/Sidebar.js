import React, { useState } from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  const navigate = useNavigate();
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      {/* Custom Collapsible Section */}
      <div className="collapsible-section">
        <div
          className="collapsible-header"
          onClick={() => setProductsOpen((prev) => !prev)}
        >
          <ImportExportIcon />
          <span>Products</span>
          {productsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>

        {productsOpen && (
          <div className="collapsible-content">
            <p onClick={() => navigate("/admin/products")}>
              <PostAddIcon /> All
            </p>
            <p onClick={() => navigate("/admin/product")}>
              <AddIcon /> Create
            </p>
          </div>
        )}
      </div>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
