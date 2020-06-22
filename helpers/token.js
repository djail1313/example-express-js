const jwt = require('jsonwebtoken')

exports.generateAccessToken = (user, req) => {
    let payload = {
        user: user.id
    }
    return jwt.sign(payload, process.env.APP_KEY, {
        expiresIn: 60 * 60 * 24,
        subject: req.originalUrl,
        issuer: user.email
    })
}