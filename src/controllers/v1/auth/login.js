const { body } = require("express-validator");
const HttpStatus = require("http-status-codes");
const { User, AccessToken } = require("@models");
const HttpException = require("@exceptions/httpException");

const toDto = (tokenType, accessToken, user) => {
  return {
    tokenType: tokenType,
    accessToken: accessToken,
    user: user,
  };
};

const findUser = async (email) => {
  let user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw HttpException(
      HttpStatus.NOT_FOUND,
      "Your email or password is invalid"
    );
  }
  return user;
};

exports.validationRules = () => {
  return [
    body("email", "Email doesn't exists").exists(),
    body("email", "Invalid email format").isEmail(),
    body("password", "Password doesn't exists").exists(),
  ];
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  await Promise.resolve()
    .then(async () => {
      let user = await findUser(email);
      if (!user.checkPassword(password)) {
        throw HttpException(
          HttpStatus.NOT_FOUND,
          "Your email or password is invalid"
        );
      }
      let accessToken = await AccessToken.produceToken(user);
      res.json(toDto("bearer", accessToken.accessToken, user));
    })
    .catch(next);
};
