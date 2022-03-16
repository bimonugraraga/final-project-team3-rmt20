const reportController = require("../controllers/reportsControllers");
const router = require("express").Router();

router.post("/", reportController.createReport);

module.exports = router;
