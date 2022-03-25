function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      let errorMessageValidation = err.errors.map((e) => e.message);
      res.status(400).json({message: errorMessageValidation[0]});
      break;
    case "Unauthorized":
      res.status(err.code).json({
        message: err.message,
      });
      break;
    case "SequelizeUniqueConstraintError":
      let errorMessage = err.errors.map((e) => e.message);
      res.status(400).json({message: errorMessage[0]});
      break;
    case "NOT FOUND":
      res.status(err.code).json({
        message: err.message,
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        message: "Invalid Token",
      });
      break;
    default:
      res.status(500).json({
        message: "Internal server error",
      });
      break;
  }
}

module.exports = errorHandler;
