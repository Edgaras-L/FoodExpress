const express = require("express");
const { get } = require("http");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

module.exports = app;