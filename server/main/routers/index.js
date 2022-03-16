const express = require('express')
const router = express.Router()
const userRoute = require('./users')


//!User Route
router.use('/users', userRoute)

module.exports = router