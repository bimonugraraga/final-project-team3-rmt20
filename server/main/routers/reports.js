const express = require('express')
const router = express.Router()
const authn = require('../middlewares/authn')
const ReportController = require('../controllers/reportsControllers')

//!Get All Weather Report
router.get('/weathers', ReportController.getAllWeatherReport)


//!Get One Weather report
router.get('/weathers/:id', ReportController.getOneWeatherReport)


//!Authn
router.use(authn)

//!Post Weather Report
router.post('/weathers', ReportController.postWeatherReport)

module.exports = router