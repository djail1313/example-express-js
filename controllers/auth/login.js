const { body } = require('express-validator')
const { User } = require('../../models/index')
const HttpException = require('../../exceptions/httpException')
const md5 = require('md5')
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
        body('email', "Email doesn't exists").exists(),
        body('email', 'Invalid email format').isEmail(),
        body('password', "Password doesn't exists").exists()
    ]
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    await Promise.resolve().then(async () => {
        let user = await User.findOne({
            where: {
                email: email
            }
        });

        let errorMessage = 'Your email or password is invalid'
        let errorCode = 404

        if (!user) {
            throw HttpException(errorCode, errorMessage)
        }
        if (md5(password) != user.password) {
            throw HttpException(errorCode, errorMessage)
        }

        res.json(toDto('bearer', token.generateAccessToken(user, req), user))
        
    }).catch(next)
}