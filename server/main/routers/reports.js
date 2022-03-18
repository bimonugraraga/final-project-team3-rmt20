const reportController = require("../controllers/reportControllers");
const router = require("express").Router();

router.get("/", reportController.allEarthquakeReport);
router.post("/", reportController.createReport);
router.post("/:id", reportController.removeReport);
router.get("/:id", reportController.earthquakeReportById);

module.exports = router;
