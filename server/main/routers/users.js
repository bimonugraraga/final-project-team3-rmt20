const express = require('express')
const router = express.Router()
const AuthnController = require('../controllers/authControllers')

//!Register
router.post('/register', AuthnController.registerUser)

//!Login
router.post('/login', AuthnController.loginUser)
module.exports = router