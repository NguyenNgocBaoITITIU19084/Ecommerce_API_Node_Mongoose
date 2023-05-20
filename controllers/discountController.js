const catchAsync = require("../middlewares/catchAsync");
const discountSchema = require("../models/discount");
const ApiError = require("../utils/ApiError");
const { STATUS_CODE } = require("../contants/statusCode");

exports.createDiscount = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { code, description, discountPersent } = req.body;
  const discount = await discountSchema.create({
    code,
    description,
    discountPersent,
    createBy: userId,
  });
  res.status(201).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Create Discount",
    data: discount,
  });
});

exports.getAllDiscount = catchAsync(async (req, res) => {
  const discounts = await discountSchema.find();
  if (!discounts) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    data: discounts,
  });
});
exports.getDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const discount = await discountSchema.findById(id);
  if (!discount) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    data: discount,
  });
});

exports.updateDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { code, description, discountPersent } = req.body;
  const updateDiscount = await discountSchema.findByIdAndUpdate(
    id,
    {
      code,
      description,
      discountPersent,
      updateBy: userId,
    },
    { new: true }
  );
  if (!updateDiscount) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Update Discount",
    data: updateDiscount,
  });
});

exports.bannedDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const discount = await discountSchema.findById(id);
  if (!discount) {
    throw new ApiError(404, "Not Found");
  }
  const bannedDiscount = await discountSchema.findByIdAndUpdate(
    id,
    {
      isActive: !discount.isActive,
      updateBy: userId,
    },
    { new: true }
  );
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Update Discount",
    data: bannedDiscount,
  });
});
exports.deleteDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleteDiscount = await discountSchema.findByIdAndDelete(id);
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Delete Discount",
    data: deleteDiscount,
  });
});
