const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const productSchema = require("../models/product");

exports.createProduct = catchAsync(async (req, res) => {
  const {
    name,
    description,
    code,
    price,
    importPrice,
    discount,
    category,
    image,
  } = req.body;
  const product = await productSchema.create({
    name,
    description,
    code,
    price,
    importPrice,
    discount,
    category,
    image,
  });
  res.status(201).json({ success: true, data: product });
});

exports.getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productSchema.findById(id).populate("category", "-_id");
  if (!product) {
    throw new ApiError(404, "Not Found");
  }
  res.json({ success: true, data: product });
});

exports.updateProductById = catchAsync(async (req, res) => {
  const {
    name,
    description,
    code,
    price,
    importPrice,
    discount,
    category,
    image,
  } = req.body;
  const { id } = req.params;
  const product = await productSchema.findByIdAndUpdate(
    id,
    {
      name,
      description,
      code,
      price,
      importPrice,
      discount,
      category,
      image,
    },
    { new: true }
  );
  if (!product) {
    throw new ApiError(404, "Not Found");
  }
  res.json({ success: true, data: product });
});

exports.getProducts = catchAsync(async (req, res) => {
  const products = await productSchema
    .find({})
    .populate("category", "name description -_id");
  if (!products) {
    throw new ApiError(404, "Not Found");
  }
  res.json({ success: true, data: products });
});

exports.deleteProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await productSchema.findOneAndDelete({ id });
  res.json({ success: true, message: "Success to delete" });
});
