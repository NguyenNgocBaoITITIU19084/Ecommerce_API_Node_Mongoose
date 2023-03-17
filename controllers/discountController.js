const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");

exports.createDiscount = catchAsync(async (req, res) => {
  const { name, description, discountPersent, isActive } = req.body;
});
