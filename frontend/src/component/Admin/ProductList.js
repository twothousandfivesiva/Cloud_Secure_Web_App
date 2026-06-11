import React, { Fragment, useEffect, useState } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, toast, navigate, deleteError, isDeleted]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <Typography variant="h4" id="productListHeading">
            ALL PRODUCTS
          </Typography>

          <div className="productListTableWrapper">
            <table className="productListTable">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.Stock}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <Link to={`/admin/product/${item._id}`}>
                        <EditIcon />
                      </Link>
                      <Button onClick={() => deleteProductHandler(item._id)}>
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                &laquo;
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                &raquo;
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
