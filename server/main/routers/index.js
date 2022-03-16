const express = require('express')
const router = express.Router()
const authn = require('../middlewares/authn')
const userRoute = require('./users')


//!User Route
router.use('/users', userRoute)

//!Authn
router.use(authn())

module.exports = router