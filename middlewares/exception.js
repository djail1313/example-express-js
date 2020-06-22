module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        next(err)
    }
    console.log(err)
    res.status(err.statusCode ? err.statusCode : 500).json({
        error: true,
        message: err.message
    })
}