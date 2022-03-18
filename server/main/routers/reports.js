const express = require("express");
const router = express.Router();
const authn = require("../middlewares/authn");
const weatherReportController = require("../controllers/weatherReportsControllers");
const eqReportController = require("../controllers/eqReportControllers");

//!Get All Weather Report
router.get("/weathers", weatherReportController.getAllWeatherReport);

router.get("/earthquakes", eqReportController.allEarthquakeReport);
router.get("/earthquakes/:id", eqReportController.earthquakeReportById);

//!Get One Weather report
router.get("/weathers/:id", weatherReportController.getOneWeatherReport);

//!Authn
router.use(authn);

//!Post Weather Report
router.post("/weathers", weatherReportController.postWeatherReport);

router.post("/earthquakes", eqReportController.createReport);
router.post("/earthquakes/:id", eqReportController.removeReport);
module.exports = router;
