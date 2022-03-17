const reportController = require("../controllers/reportControllers");
const router = require("express").Router();

router.post("/", reportController.createReport);
router.post("/:id", reportController.removeReport);

module.exports = router;
