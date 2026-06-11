import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import React, { useEffect,useState } from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import { useSelector } from "react-redux";
import Search from "./component/Product/Search.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingIcons from "./component/layout/FloatingIcons/FloatingIcons.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
// import PaymentWrapper from "./component/Cart/PaymentWrapper.js"; 
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import OrderDetails from "./component/Order/OrderDetails.js";
import { toast } from "react-toastify";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from './component/Admin/OrderList.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
const theme = createTheme();


function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
     const [stripeApiKey, setStripeApiKey] = useState("");
     
      async function getStripeApiKey() {
   try{ const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);}
    catch(error){
   
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    
    <Router>
      
      <Header />
       {isAuthenticated && (
    // <div style={{
    //   position: "fixed",
    //   top: "1rem",
    //  right: "1.5rem",
      
    //   zIndex: 1000,
    // }}>
      <UserOptions user={user} />
    // </div>
  )}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
         <Route exact path="/products" element={<Products/>} />
            <Route exact path="/search" element={<Search/>} />
           <Route  path="/products/:keyword" element={<Products/>} />
            <Route exact path="/login" element={<LoginSignUp/>} />
             {/* <Route exact path="/register" element={<LoginSignUp/>} /> */}
                  <Route exact path="/contact" element={<Contact/>} />
                  <Route exact path="/about" element={<About/>} />
               
             <Route path="/account" element={
                    <ProtectedRoute>
                    <Profile />
                     </ProtectedRoute>
                      }
              />
               <Route path="/me/update" element={
                    <ProtectedRoute>
                  <UpdateProfile />
                     </ProtectedRoute>
                      }
              />
                <Route path="/password/update" element={
                    <ProtectedRoute>
                  <UpdatePassword/>
                     </ProtectedRoute>
                      }
              />
                <Route exact path="/password/forgot" element={<ForgotPassword/>} />
                
                 <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
                  <Route exact path="/cart" element={<Cart/>} />
                   <Route path="/shipping" element={
                    <ProtectedRoute>
                  <Shipping/>
                     </ProtectedRoute>
                      }
              />
               
  <Route
  path="/process/payment"
  element={
    <ProtectedRoute>
      {stripeApiKey ? (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      ) : (
        <h2 style={{ textAlign: "center", marginTop: "5rem" }}>
          Loading payment gateway...
        </h2>
      )}
    </ProtectedRoute>
  }
/>

 <Route  path="/success" element={
                    <ProtectedRoute>
                  <OrderSuccess/>
                     </ProtectedRoute>
                      }
              />
   <Route  path="/orders" element={
                    <ProtectedRoute>
                  <MyOrders/>
                     </ProtectedRoute>
                      }
              />
           
                <Route  path="/order/:id" element={
                    <ProtectedRoute>
                  <OrderDetails/>
                     </ProtectedRoute>
                      }
              />
               <Route path="/order/confirm" element={
                    <ProtectedRoute>
                  <ConfirmOrder/>
                     </ProtectedRoute>
                      }
              />
               <Route  path="/admin/dashboard" element={
                    <ProtectedRoute isAdmin={true}>
                  <Dashboard/>
                     </ProtectedRoute>
                      }
              />
                <Route  path="/admin/products" element={
                    <ProtectedRoute isAdmin={true}>
                  <ProductList/>
                     </ProtectedRoute>
                      }
              />
               <Route  path="/admin/product" element={
                    <ProtectedRoute isAdmin={true}>
                  <NewProduct/>
                     </ProtectedRoute>
                      }
              />
               <Route  path="/admin/product/:id" element={
                    <ProtectedRoute isAdmin={true}>
                  <UpdateProduct/>
                     </ProtectedRoute>
                      }
              />
                <Route  path="/admin/orders" element={
                    <ProtectedRoute isAdmin={true}>
                  <OrderList/>
                     </ProtectedRoute>
                      }
              />
                <Route  path="/admin/order/:id" element={
                    <ProtectedRoute isAdmin={true}>
                  <ProcessOrder/>
                     </ProtectedRoute>
                      }
              />
               <Route  path="/admin/users" element={
                    <ProtectedRoute isAdmin={true}>
                  <UsersList/>
                     </ProtectedRoute>
                      }
              />
                <Route  path="/admin/user/:id" element={
                    <ProtectedRoute isAdmin={true}>
                  <UpdateUser/>
                     </ProtectedRoute>
                      }
              />
               <Route  path="/admin/reviews" element={
                    <ProtectedRoute isAdmin={true}>
                  <ProductReviews/>
                     </ProtectedRoute>
                      }
              />
               {/* {
          window.location.pathname !== "/process/payment" && (
            <Route path="*" element={<NotFound />} />
          )
        } */}
       <Route path="*" element={<NotFound />} />


     
      </Routes>
      <FloatingIcons />
      <Footer />
   
    </Router>
   
  );
}

export default App;
