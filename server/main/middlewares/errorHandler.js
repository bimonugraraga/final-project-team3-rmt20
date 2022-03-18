function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      let errorMessageValidation = err.errors.map((e) => e.message);
      res.status(400).json(errorMessageValidation);
      break;
    case "Unauthorized":
      res.status(err.code).json({
        message: err.message,
      });
      break;
    case "SequelizeUniqueConstraintError":
      let errorMessage = err.errors.map((e) => e.message);
      res.status(400).json(errorMessage);
      break;
    case "Invalid User":
      res.status(err.code).json({
        message: err.message,
      });
      break;
    case "checkout failed":
      res.status(err.code).json({
        message: err.message,
      });
      break;
    case "NOT FOUND":
      res.status(err.code).json({
        message: err.message,
      });
      break;
    case "Permission_Not_Enough":
      res.status(err.code).json({
        message: err.message,
      });
      break;
    case "Login not yet":
      res.status(err.code).json({
        message: err.message,
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        message: "Invalid Token",
      });
      break;
    case "TokenExpiredError":
      res.status(401).json({
        message: "Token Expired",
      });
      break;
    case "Bad Request":
      res.status(err.code).json({
        message: err.message,
      });
    default:
      res.status(500).json({
        message: "Internal server error",
      });
      break;
  }
}

module.exports = errorHandler;
