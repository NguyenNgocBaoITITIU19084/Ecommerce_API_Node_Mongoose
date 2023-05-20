const catchAsync = require("../middlewares/catchAsync");
const brandSchema = require("../models/brand");
const ApiError = require("../utils/ApiError");
const { STATUS_CODE } = require("../contants/statusCode");

exports.createBrand = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { name, description, images } = req.body;
  const brand = await brandSchema.create({
    name,
    description,
    images,
    createBy: id,
  });
  res.status(201).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Create Brand",
    data: brand,
  });
});

exports.getAllBrands = catchAsync(async (req, res) => {
  const brands = await brandSchema.find();
  if (!brands) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    data: brands,
  });
});

exports.getBrandById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const brand = await brandSchema.findById(id);
  if (!brand) {
    throw new ApiError(404, "Not Found");
  }
  res.json({ successStatus: STATUS_CODE.SUCCESS, data: brand });
});

exports.deleteBrandById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const brand = await brandSchema.findByIdAndDelete(id);
  if (!brand) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Delete Brand",
    data: brand,
  });
});

exports.updateBrandById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { name, description, images } = req.body;
  const brand = await brandSchema.findByIdAndUpdate(
    id,
    {
      name,
      description,
      images,
      updateBy: userId,
    },
    { new: true }
  );
  if (!brand) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Update Brand",
    data: brand,
  });
});
exports.bannedBrandById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const brand = await brandSchema.findById(id);
  if (!brand) {
    throw new ApiError(404, "Not Found");
  }
  const bannedBrand = await brandSchema.findByIdAndUpdate(
    id,
    {
      isActive: !brand.isActive,
      updateBy: userId,
    },
    { new: true }
  );
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Update Brand",
    data: bannedBrand,
  });
});
