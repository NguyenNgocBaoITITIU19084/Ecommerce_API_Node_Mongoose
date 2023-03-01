const catchAsync = require("../middlewares/catchAsync");
const AuthSchema = require("../models/auth");

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
