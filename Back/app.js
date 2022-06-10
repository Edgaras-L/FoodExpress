const express = require("express");
const { get } = require("http");
const cookieSession = require("cookie-session");

const TransactionsRoutes = require("./routes/TransactionsRoutes");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/user.routes")
const restaurantRoutes = require("./routes/restaurantRoutes")

const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(
  cookieSession({
    username: "user-session",
    secret: "oogabooga", // should use as secret environment variable
    httpOnly: true
  })
);

app.use("/api/v1/users", TransactionsRoutes );
app.use("/api/v1/tours", tourRoutes );
app.use("/api/v1/restaurants", restaurantRoutes );



module.exports = app;