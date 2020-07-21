const HttpException = require("./httpException");
const HttpStatus = require("http-status-codes");

module.exports = (message = "You are not allowed to access this resources") => {
  throw HttpException(HttpStatus.FORBIDDEN, message);
};
