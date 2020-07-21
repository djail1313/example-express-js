const router = require("express").Router();
const loginController = require("@controllers/v1/auth/login");
const registerController = require("@controllers/v1/auth/register");
const validator = require("@middlewares/validator");

router.post(
  "/login",
  loginController.validationRules(),
  validator,
  loginController.login
);
router.post(
  "/register",
  registerController.validationRules(),
  validator,
  registerController.register
);

module.exports = router;
