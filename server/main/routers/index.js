const router = require("express").Router();
const events = require("./events");
const reports = require("./reports");

router.use("/events", events);
router.use("/reports", reports);

module.exports = router;
