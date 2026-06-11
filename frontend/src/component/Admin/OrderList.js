import React, { Fragment, useEffect, useState } from "react";
import "./orderList.css"; 
import { useSelector, useDispatch } from "react-redux";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Fragment>
      <MetaData title="ALL ORDERS - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <Typography variant="h4" id="productListHeading">
            ALL ORDERS
          </Typography>

          <div className="productListTableWrapper">
            <table className="productListTable">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Items Qty</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td
                      className={
                        item.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {item.orderStatus}
                    </td>
                    <td>{item.orderItems.length}</td>
                    <td>₹{item.totalPrice}</td>
                    <td>
                      <Link to={`/admin/order/${item._id}`}>
                        <EditIcon />
                      </Link>
                      <Button onClick={() => deleteOrderHandler(item._id)}>
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

export default OrderList;
