const jwt = require("jsonwebtoken");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

const AuthSchema = require("../models/auth");
const ApiError = require("../utils/ApiError");

exports.jwtAuth = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    throw new ApiError(401, "Unauthorized");
  }
  const token = headerToken.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  try {
    const user = jwt.verify(token, process.env.SERECT_KEY);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token is expired!");
    }
    throw new ApiError(401, "Unauthorized");
  }
};
