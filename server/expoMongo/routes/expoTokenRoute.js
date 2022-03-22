const express = require('express')
const router = express.Router()
const ExpoTokenController = require('../controllers/expoTokenController')


router.get('/', ExpoTokenController.getAllExpoToken)

router.post('/', ExpoTokenController.postExpoToken)

router.get('/:expoToken', ExpoTokenController.getOneExpoToken)

module.exports = router