const catchError = (err, req, res, next) => {
  console.log("catchError Middwares---", JSON.stringify(err, null, 2));

  if (err.code === 11000) {
    const fields = err.keyValue;
    const keys = Object.keys(fields).join(",");
    err.message = `${keys} is duplicate`;
    err.statusCode = 400;
  }

  if (err.name === "ValidationError") {
    const errors = err.errors;
    const keys = Object.keys(errors);
    const ErrObject = {};
    keys.map((key) => {
      ErrObject[key] = errors[key].message;
    });
    err.message = ErrObject;
    err.statusCode = 400;
  }

  res
    .status(err.statusCode || 500)
    .json({ statusCode: err.statusCode, message: err.message });
};
module.exports = catchError;
