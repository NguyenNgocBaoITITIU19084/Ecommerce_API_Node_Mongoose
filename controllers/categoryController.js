const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const categorySchema = require("../models/category");

exports.createCategory = catchAsync(async (req, res) => {
  const { name, description } = req.body;
  const category = await categorySchema.create({
    name,
    description,
  });
  res.status(201).json({ success: true, data: category });
});

exports.getCategories = catchAsync(async (req, res) => {
  const categories = await categorySchema.find();
  if (!categories) {
    throw new ApiError(404, "Not Founf");
  }
  res.status(200).json({ success: true, data: categories });
});

exports.getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await categorySchema.findById(id);
  if (!category) {
    throw new ApiError(404, "Not Found");
  }
  res.json({ success: true, data: category });
});

exports.deleteCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await categorySchema.findByIdAndDelete(id);
  res.json({ success: true });
});

exports.updateCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const category = await categorySchema.findByIdAndUpdate(
    id,
    {
      name,
      description,
    },
    { new: true }
  );
  res.json({ success: true, data: category });
});
