const catchAsync = require("../middlewares/catchAsync");
const brandSchema = require("../models/brand");

exports.createBrand = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { name, description, images } = req.body;
  const brand = await brandSchema.create({
    name,
    description,
    images,
    createBy: id,
  });
  res.status(201).json({ data: brand });
});
