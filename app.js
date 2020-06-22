require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exceptionHandler = require('./middlewares/exception')

app.use(bodyParser.json())

// Load routes
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')

// Define routes
app.use('/', indexRouter)
app.use('/auth', authRouter)

// Exception handler middleware should be on bottom
app.use(exceptionHandler)

// Listen server
const server = app.listen(process.env.PORT, () => {
    console.log(`Application is running on http://localhost:${process.env.PORT}`)
})