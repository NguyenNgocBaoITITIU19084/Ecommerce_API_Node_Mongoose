const ApiError = require("../utils/ApiError");

exports.authorize =
  (...roles) =>
  (req, res, next) => {
    const role = req.user.role;
    if (!role || !role.includes(...roles)) {
      throw new ApiError(403, "No Permission");
    }
    next();
  };
