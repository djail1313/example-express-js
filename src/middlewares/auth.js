const UnauthorizedException = require("@exceptions/unauthorizedException");
const { AccessToken } = require("@models");

const clearToken = (token) => {
  return token.replace("Bearer ", "").replace("bearer ", "");
};

module.exports = async (req, res, next) => {
  await Promise.resolve()
    .then(async () => {
      let token = req.header("Authorization");
      if (token == undefined) {
        throw UnauthorizedException();
      }
      token = clearToken(token);
      let accessToken = await AccessToken.verifyToken(token);
      req.accessToken = accessToken;
      next();
    })
    .catch(next);
};
