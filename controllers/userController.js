const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");

const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const AuthSchema = require("../models/auth");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await AuthSchema.find({}).select("-password");
  res.json({ success: true, data: users });
});

exports.getUserDetailById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await AuthSchema.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "Not Found");
  }
  res.json({ success: true, data: user });
});

exports.getUserByEmail = catchAsync(async (req, res) => {
  const email = req.body;
  const user = await AuthSchema.findOne({ email }).select("-password");
  if (!user) {
    throw new ApiError(404, "Not Found");
  }
  res.json({ success: true, data: user });
});

exports.deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AuthSchema.findByIdAndDelete(id);
  res.json({ success: true });
});

exports.deleteUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  await AuthSchema.findOneAndDelete({ email });
  res.json({ success: true });
});

exports.setActiveUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await AuthSchema.findById(id);
  if (!user) {
    throw new ApiError(404, "Invalid Id");
  }
  const newActive = await AuthSchema.findByIdAndUpdate(
    id,
    { isActive: !user.isActive },
    { new: true }
  ).select("_id name email isActive");
  res.json({ success: true, data: newActive });
});

exports.AddUser = catchAsync(async (req, res) => {
  const { email, roles } = req.body;
  const isExistedUser = await AuthSchema.findOne({ email });
  if (isExistedUser) {
    throw new ApiError(404, "Existed Email");
  }
  const randomPassword = randomstring.generate(10);
  const newUser = AuthSchema.create(
    { email, password: randomPassword, roles },
    { new: true }
  );
  res.json({ success: true, data: newUser });
});
