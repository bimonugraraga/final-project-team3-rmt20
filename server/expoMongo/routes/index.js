const express = require('express')
const router = express.Router()
const expoTokenRoute = require('./expoTokenRoute')


router.use('/expo-tokens', expoTokenRoute)

module.exports = router