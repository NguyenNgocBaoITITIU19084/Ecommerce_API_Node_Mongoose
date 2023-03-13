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
