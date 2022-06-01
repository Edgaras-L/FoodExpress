const express = require("express");
const { get } = require("http");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);

module.exports = app;