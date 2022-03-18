const express = require('express')
const router = express.Router()
const authn = require('../middlewares/authn')
const userRoute = require('./users')
const reportRoute = require('./reports')


//!User Route
router.use('/users', userRoute)



//!Report Route
router.use('/reports', reportRoute)


module.exports = router