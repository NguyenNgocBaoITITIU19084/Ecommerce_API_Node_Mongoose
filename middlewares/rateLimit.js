const rateLimit = require("express-rate-limit");

exports.limiter = (request, time) =>
  rateLimit({
    windowMs: time * 60 * 1000, // 15 minutes
    max: request, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
