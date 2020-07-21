const HttpStatus = require("http-status-codes");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  console.log(err);
  res
    .status(err.statusCode ? err.statusCode : HttpStatus.INTERNAL_SERVER_ERROR)
    .json({
      message: err.message,
    });
};
