const router = require('express').Router()
const loginController = require('../controllers/auth/login')
const registerController = require('../controllers/auth/register')
const validator = require('../middlewares/validator')

router.post('/login', loginController.validationRules(), validator, loginController.login)
router.post('/register', registerController.validationRules(), validator, registerController.register)

module.exports = router