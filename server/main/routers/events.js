const EventController = require("../controllers/eventControllers");
const router = require("express").Router();

router.post("/earthquake", EventController.createEventEq);
router.get("/earthquake/:id", EventController.detailEq);

module.exports = router;
