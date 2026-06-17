import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import {getProduct,clearErrors} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { toast } from "react-toastify";


const Home = () => {
    
    const dispatch = useDispatch();
     const { loading, error, products } = useSelector((state) => state.products);
     useEffect(() => {
  dispatch(getProduct());
}, [dispatch]);
      useEffect(() => {
     if (error) {
       toast.error(error, { toastId: "product-error" })
      dispatch(clearErrors());
    }

   
  }, [dispatch,error,toast]);
  console.log("Redux Products:", products);
    return (
   <Fragment>
    {loading?(
<Loader/>
    ):(
       <Fragment>
          <MetaData title="GRAB 'N GO" />
          <div className="banner">
            <p>Welcome to Grab 'N Go</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
             <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured products</h2>
           <div className="container" id="container">
         {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
           </div>
      
          </Fragment>
    )
    }
   </Fragment>
          );
          };
          export default Home;