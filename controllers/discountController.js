const catchAsync = require("../middlewares/catchAsync");
const discountSchema = require("../models/discount");
const ApiError = require("../utils/ApiError");

exports.createDiscount = catchAsync(async (req, res) => {
  const { name, description, discountPersent, isActive } = req.body;
  const discount = await discountSchema.create({
    name,
    description,
    discountPersent,
    isActive,
  });
  res.status(201).json({ success: true, data: discount });
});
