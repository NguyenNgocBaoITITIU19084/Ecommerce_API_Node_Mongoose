const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const productSchema = require("../models/product");
const { STATUS_CODE } = require("../contants/statusCode");

exports.createProduct = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {
    name,
    description,
    price,
    inStock,
    discount,
    category,
    brand,
    importPrice,
  } = req.body;
  const product = await productSchema.create({
    name,
    description,
    price,
    inStock,
    discount,
    category,
    brand,
    importPrice,
    createBy: userId,
  });
  res.status(201).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Create Product",
    data: product,
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productSchema.findById(id);
  if (!product) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    data: product,
  });
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
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Update Product",
    data: product,
  });
});

exports.getProducts = catchAsync(async (req, res) => {
  const products = await productSchema
    .find()
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "brand", select: "name" });
  if (!products) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    data: products,
  });
});

exports.deleteProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await productSchema.findOneAndDelete({ id });
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Delete Product",
    data: products,
  });
});
exports.test = catchAsync(async (req, res) => {
  const { filename } = req.file;
  console.log(filename);
});
