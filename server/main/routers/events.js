const EventController = require("../controllers/eventControllers");
const router = require("express").Router();

router.get("/", EventController.allEarthquake);
router.get("/:id", EventController.detailEq);

module.exports = router;
