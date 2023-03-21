const ApiError = require("../utils/ApiError");

exports.basicAuth = (req, res, next) => {
  const headersToken = req.headers.authorization;
  if (!headersToken) {
    throw new ApiError(401, "Unauthorize");
  }
  const token = headersToken.split(" ");
  const basicToken = Buffer.from(
    process.env.BASIC_USER_AUTH + ":" + process.env.BASIC_PASSWORD_AUTH
  ).toString("base64");
  if (!token[1] || token[0] !== "Basic" || token[1] !== basicToken) {
    throw new ApiError(401, "Unauthorize");
  }
  next();
};
