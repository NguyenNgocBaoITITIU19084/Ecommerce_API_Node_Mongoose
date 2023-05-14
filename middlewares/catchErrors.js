const STATUS_CODE = require("../contants/statusCode");
const catchError = (err, req, res, next) => {
  console.log("error-----", JSON.stringify(err, null, 2));
  // bắt lỗi ở mongoose
  if (err.name === "ValidationError") {
    const errors = err.errors;
    const keys = Object.keys(errors);
    console.log("keys", keys);
    const errObject = {};
    keys.map((key) => {
      errObject[key] = errors[key].message;
      // bat loi sai enum o role
      if (errors[key].kind === "enum") {
        errObject[key] = "invalid enum value";
      }
    });
    err.statusCode = 400;
    err.message = errObject;
  }
  // bắt lỗi điền sai id
  if (err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "Invalid Id";
  }

  // Catch Error Duplication Email
  if (err.code === 11000) {
    err.statusCode = 400;
    // err.message = `${err.keyValue.email} is already exist!`;
    // const fields = Object.keys(err.keyValue).toString(); // email, name is duplicate
    const fields = Object.keys(err.keyValue).join(","); // email, name is duplicate
    err.message = `${fields} is duplicate`;
  }

  // Response API
  res.status(err.statusCode || 500).json({
    status: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Error",
  });
};

module.exports = catchError;
