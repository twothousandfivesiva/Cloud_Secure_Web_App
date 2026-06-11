import React, { Fragment, useEffect, useState } from "react";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { toast } from "react-toastify";
import {
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector((state) => state.review);
  const { error, reviews, loading } = useSelector((state) => state.productReviews);

  const [productId, setProductId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 8;

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId, navigate]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview) || [];
  const totalPages = Math.ceil((reviews?.length || 0) / reviewsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Fragment>
      <MetaData title="ALL REVIEWS - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form className="productReviewsForm" onSubmit={productReviewsSubmitHandler}>
            <Typography variant="h4" className="productReviewsFormHeading">
              ALL REVIEWS
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || productId === ""}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Search"}
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <>
              <div className="productListTableWrapper">
                <table className="productListTable">
                  <thead>
                    <tr>
                      <th>Review ID</th>
                      <th>User</th>
                      <th>Comment</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReviews.map((review) => (
                      <tr key={review._id}>
                        <td>{review._id}</td>
                        <td>{review.name}</td>
                        <td>{review.comment}</td>
                        <td
                          className={
                            review.rating >= 3 ? "greenColor" : "redColor"
                          }
                        >
                          {review.rating}
                        </td>
                        <td>
                          <IconButton
                            onClick={() => deleteReviewHandler(review._id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
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
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &raquo;
                </button>
              </div>
            </>
          ) : (
            <Typography variant="h6" className="productReviewsFormHeading">
              No Reviews Found
            </Typography>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
