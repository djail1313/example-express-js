const HttpException = require("./httpException");
const HttpStatus = require("http-status-codes");

module.exports = (
  message = "You are not authorized to access this resource"
) => {
  throw HttpException(HttpStatus.UNAUTHORIZED, message);
};
