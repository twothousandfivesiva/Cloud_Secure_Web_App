import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError, navigate]);

  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography variant="h6">Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>{order.shippingInfo?.phoneNo}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography variant="h6">Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo?.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo?.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>₹{order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography variant="h6">Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="confirmCartItems">
                  <Typography variant="h6">Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems?.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt={item.name} />
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Update Status Form */}
              {order.orderStatus !== "Delivered" && (
                <div>
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <FormControl fullWidth>
                        <InputLabel id="order-status-label">
                          Choose Status
                        </InputLabel>
                        <Select
                          labelId="order-status-label"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value="">Choose Category</MenuItem>
                          {order.orderStatus === "Processing" && (
                            <MenuItem value="Shipped">Shipped</MenuItem>
                          )}
                          {order.orderStatus === "Shipped" && (
                            <MenuItem value="Delivered">Delivered</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading || !status}
                      variant="contained"
                      color="primary"
                    >
                      Process
                    </Button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
