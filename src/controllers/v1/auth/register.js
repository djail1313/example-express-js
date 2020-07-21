const { body } = require("express-validator");
const HttpException = require("@exceptions/httpException");
const HttpStatus = require("http-status-codes");
const { User, AccessToken } = require("@models");

const toDto = (tokenType, accessToken, user) => {
  return {
    tokenType: tokenType,
    accessToken: accessToken,
    user: user,
  };
};

const createUser = async (name, email, password) => {
  let user = await User.create({
    name: name,
    email: email,
    password: User.hashPassword(password),
  }).catch((err) => {
    if (err.original.code == "ER_DUP_ENTRY") {
      throw HttpException(HttpStatus.CONFLICT, "Email already registered");
    } else {
      throw HttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Unhandled error creating user"
      );
    }
  });
  return user;
};

exports.validationRules = () => {
  return [
    body("name", "Name doesn't exsists").exists(),
    body("email", "Email doesn't exists").exists(),
    body("email", "Invalid email format").isEmail(),
    body("password", "Password doesn't exists").exists(),
    body("confirmPassword", "Confirmation password doesn't exists")
      .exists()
      .custom((value, { req }) => value == req.body.password)
      .withMessage("Password doesn't match"),
  ];
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  await Promise.resolve()
    .then(async () => {
      let user = await createUser(name, email, password);
      let accessToken = await AccessToken.produceToken(user);
      res.json(toDto("bearer", accessToken.accessToken, user));
    })
    .catch(next);
};
