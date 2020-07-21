require("dotenv").config();
require("module-alias/register");
const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const HttpStatus = require("http-status-codes");

const exceptionHandler = require("@middlewares/exception");

app.use(cors());
app.use(bodyParser.json());

// Default routes
const indexRouter = require("@routes/v1/index");
app.use("/", indexRouter);

// API v1 AUTH
const authRouter = require("@routes/v1/auth");
app.use("/api/v1/auth", authRouter);

// API v1 AUTH
const tasksRouter = require("@routes/v1/tasks");
app.use("/api/v1/tasks", tasksRouter);

// // Exception handler middleware should be on bottom
app.use(exceptionHandler);

// Listen server
const server = app.listen(process.env.PORT, () => {
  console.log(`Application is running on http://localhost:${process.env.PORT}`);
});

// Handle page not found
app.use(function (req, res, next) {
  res.status(HttpStatus.NOT_FOUND).json({
    message: "Page not found",
  });
});

// Handle 500 error
app.use(function (req, res, next) {
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Some error occured, please contact developer's team",
  });
});
