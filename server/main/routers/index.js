const express = require("express");
const router = express.Router();
const authn = require("../middlewares/authn");
const events = require("./events");
const userRoute = require("./users");
const reportRoute = require("./reports");

router.use("/events", events);
//!User Route
router.use("/users", userRoute);

//!Report Route
router.use("/reports", reportRoute);

module.exports = router;
