const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const categorySchema = require("../models/category");
const { STATUS_CODE } = require("../contants/statusCode");

exports.createCategory = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { name, description } = req.body;
  const category = await categorySchema.create({
    name,
    description,
    createBy: id,
  });
  res.status(201).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Create Category",
    data: category,
  });
});

exports.getCategories = catchAsync(async (req, res) => {
  const categories = await categorySchema
    .find()
    .populate({ path: "createBy", select: "email roles" })
    .populate({ path: "updateBy", select: "email roles" });
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    data: categories,
  });
});

exports.getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await categorySchema
    .findById(id)
    .populate({ path: "createBy", select: "email roles" })
    .populate({ path: "updateBy", select: "email roles" });
  if (!category) {
    throw new ApiError(400, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    data: category,
  });
});

exports.deleteCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await categorySchema.findByIdAndDelete(id);
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Delete Category",
    data: category,
  });
});

exports.updateCategoryById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, description } = req.body;
  const updateCategory = await categorySchema
    .findByIdAndUpdate(id, {
      name,
      description,
      updateBy: userId,
    })
    .populate({ path: "createBy", select: "email roles" })
    .populate({ path: "updateBy", select: "email roles" });
  if (!updateCategory) {
    throw new ApiError(400, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Update Category",
    data: updateCategory,
  });
});

exports.bannedCategoryById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const category = await categorySchema.findById(id);
  if (!category) {
    throw new ApiError(400, "Not Found");
  }
  const updateCategory = await categorySchema
    .findByIdAndUpdate(id, {
      isActive: !category.isActive,
      updateBy: userId,
    })
    .populate({ path: "createBy", select: "email roles" })
    .populate({ path: "updateBy", select: "email roles" });
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Banned Category",
    data: updateCategory,
  });
});
