if (process.env.NODE_ENV !== "production") {
  require("dotenv");
}

const express = require("express");
const app = express();
const port = process.env.PORT || 2000;
const cors = require("cors");
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);
app.use(errorHandler);

// app.listen(port, () => {
//   console.log("server is running");
// });
module.exports = app;
