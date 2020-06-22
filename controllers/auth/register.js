const { body } = require('express-validator')
const { User } = require('../../models/index')
const md5 = require('md5')
const HttpException = require('../../exceptions/httpException')
const token = require('../../helpers/token')

const toDto = (token_type, access_token, user) => {
    return {
        token_type: token_type,
        access_token: access_token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

exports.validationRules = () => {

    return [
        body('name', "Name doesn't exsists").exists(),
        body('email', "Email doesn't exists").exists(),
        body('email', 'Invalid email format').isEmail(),
        body('password', "Password doesn't exists").exists(),
        body('confirm_password', "Confirmation password doesn't exists").exists()
            .custom((value, { req }) => value == req.body.password).withMessage("Password doesn't match")
    ]
}

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body

    await Promise.resolve().then(async () => {

        let user = await User.create({
            name: name,
            email: email,
            password: md5(password)
        }).catch((err) => {
            console.log(err)
            if (err.original.code == 'ER_DUP_ENTRY') {
                throw HttpException(409, "Email already registered")
            } else {
                throw HttpException(500, "Unhandled error creating user")
            }
        })
        
        res.json(toDto('bearer', token.generateAccessToken(user, req), user))

    }).catch(next)
}
