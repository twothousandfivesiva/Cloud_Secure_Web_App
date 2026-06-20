const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/config.env"});
app.use(express.json());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});

app.use(limiter);


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.get("/", (req, res) => {
    res.send("Welcome to Buy and Try API!");
});
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "Buy and Try API",
        timestamp: new Date().toISOString()
    });
});
//middleware for errors
app.use(errorMiddleware);
module.exports = app;