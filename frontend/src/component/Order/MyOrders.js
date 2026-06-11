import React, { Fragment, useEffect, useState } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const [sortColumn, setSortColumn] = useState("id");
  const [filterColumn, setFilterColumn] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  const columns = [
    { id: "id", label: "Order ID" },
    { id: "status", label: "Status" },
    { id: "itemsQty", label: "Items Qty" },
    { id: "amount", label: "Amount" },
  ];

  const rows = orders?.map((item) => ({
    id: item._id,
    status: item.orderStatus,
    itemsQty: item.orderItems.length,
    amount: item.totalPrice,
  })) || [];

  const filteredRows = rows
    .filter((row) =>
      row[filterColumn].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (typeof aVal === "number") return aVal - bVal;
      return aVal.localeCompare(bVal);
    });

  return (
    <Fragment>
      <MetaData title={`${user?.name}'s Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>

          <div className="filterBar">
            {/* <input
              type="text"
              placeholder={`Search by ${filterColumn}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            /> */}
            <select value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
              {columns.map((col) => (
                <option key={col.id} value={col.id}>{col.label}</option>
              ))}
            </select>
            <select value={sortColumn} onChange={(e) => setSortColumn(e.target.value)}>
              {columns.map((col) => (
                <option key={col.id} value={col.id}>Sort by {col.label}</option>
              ))}
            </select>
          </div>

          <div className="tableContainer">
            <table className="ordersTable">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.id}>{col.label}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td className={row.status === "Delivered" ? "greenColor" : "redColor"}>
                      {row.status}
                    </td>
                    <td>{row.itemsQty}</td>
                    <td>₹{row.amount}</td>
                    <td>
                      <Link to={`/order/${row.id}`}>
                        <LaunchIcon />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
