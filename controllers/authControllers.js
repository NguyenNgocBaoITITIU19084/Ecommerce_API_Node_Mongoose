const catchAsync = require("../middlewares/catchAsync");
const AuthSchema = require("../models/auth");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SERECT_KEY = process.env.SERECT_KEY;
exports.register = catchAsync(async (req, res) => {
  const { name, email, password, age } = req.body;
  const existedAuth = await AuthSchema.create({
    name,
    email,
    password,
    age,
  });

  res.status(201).json({ succes: true, data: existedAuth });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const existedEmail = await AuthSchema.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, "Unauthorize");
  }
  const isMatch = bcrypt.compareSync(password, existedEmail.password);
  if (!isMatch) {
    throw new ApiError(300, "Unauthorize");
  }
  const token = jwt.sign(
    {
      email: existedEmail.email,
      role: existedEmail.role,
    },
    SERECT_KEY,
    { expiresIn: "1d" }
  );
  res.status(200).json({ succes: true, token: token });
});
