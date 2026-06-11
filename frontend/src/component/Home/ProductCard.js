import React from 'react'
import { Link } from "react-router-dom";
 import Rating from "react-rating-stars-component";

const ProductCard = ({product }) => {
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  console.log("Product:", product);
  return (
 <Link className="productCard" to={`/product/${product._id}`}>
  
{/* 
  <img src={product?.images?.[0]?.url || "/default.jpg"} /> */}
       <img src={product.images[0].url} alt={product.name} />
           <p>{product.name}</p>
              <div>
        <Rating {...options} /><span> ({product.numOfReviews} Reviews)</span></div>
        <span>₹{product.price}</span>
 </Link>
  );
};

export default ProductCard
