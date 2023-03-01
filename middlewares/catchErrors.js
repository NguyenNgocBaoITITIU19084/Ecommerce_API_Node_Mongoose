const catchError = (err, req, res, next) => {
  console.log("catchError Middwares---", JSON.stringify(err, null, 2));
};
module.exports = catchError;
