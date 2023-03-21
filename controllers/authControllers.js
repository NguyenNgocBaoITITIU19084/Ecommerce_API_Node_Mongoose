const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");

const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const AuthSchema = require("../models/auth");
const TokenSchema = require("../models/token");
const EmailService = require("../utils/EmailService");

const SERECT_KEY = process.env.SERECT_KEY;

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, age, address, phoneNumber, gender } = req.body;
  const existedAuth = await AuthSchema.create({
    name,
    email,
    password,
    age,
    address,
    phoneNumber,
    gender,
  });
  res.status(201).json({ success: true, data: existedAuth });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const existedEmail = await AuthSchema.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, "email or password is not valid");
  }
  const isMatch = bcrypt.compareSync(password, existedEmail.password);
  if (!isMatch) {
    throw new ApiError(400, "email or password is not valid");
  }
  const token = jwt.sign(
    {
      email: existedEmail.email,
      role: existedEmail.role,
    },
    SERECT_KEY,
    { expiresIn: "1d" }
  );
  res.status(200).json({ success: true, token: token });
});

exports.forgot = catchAsync(async (req, res) => {
  const { email } = req.body;
  const existedEmail = await AuthSchema.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, "email or password is not valid");
  }
  const isExistedToken = await TokenSchema.findOne({ UserId: existedEmail.id });
  if (isExistedToken) {
    return res.json({
      success: true,
      message: "Please, check your email",
    });
  }

  const randoomToken = randomstring.generate(20);
  const salt = bcrypt.genSaltSync();
  const hashedToken = bcrypt.hashSync(randoomToken, salt);
  await TokenSchema.create({ UserId: existedEmail.id, token: hashedToken });
  const link = `${process.env.WEB_URL}/?token=${randoomToken}&userId=${existedEmail.id}`;

  // await EmailService.sendGmail(
  //   process.env.EMAIL,
  //   email,
  //   "Reset Password",
  //   `Please click into this link ${link}`
  // );
  res.status(201).json({
    success: true,
    message: "Please, check your email",
    token: randoomToken,
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { token, userId, newPassword } = req.body;
  if (!token) {
    throw new ApiError(404, "Invalid Token");
  }
  const isExistedToken = await TokenSchema.findOne({ UserId: userId });
  if (!isExistedToken) {
    throw new ApiError(404, "Not Found");
  }
  const isMatched = bcrypt.compareSync(token, isExistedToken.token);
  if (!isMatched) {
    throw new ApiError(404, "Invalid Token");
  }
  const user = await AuthSchema.findOne({ _id: userId });
  user.password = newPassword;

  const result = await user.save();
  if (result) {
    await TokenSchema.findOneAndDelete({ UserId: userId });
  }

  // await EmailService.sendGmail(
  //   process.env.EMAIL,
  //   email,
  //   "Reset Password Successfully!",
  //   `your password have already updated`
  // );
  res.json({ success: true, message: "Please, check your email" });
});

exports.updatePassword = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { oldPassword, newPassword } = req.body;

  const user = await AuthSchema.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Invalid Email");
  }
  const isMatched = bcrypt.compareSync(oldPassword, user.password);
  if (!isMatched) {
    throw new ApiError(400, "Password is Not Matched");
  }
  user.password = newPassword;
  const result = await user.save();
  if (result) {
    // await EmailService.sendGmail(
    //   process.env.EMAIL,
    //   email,
    //   "Reset Password Successfully!",
    //   `your password have already updated`
    // );
    res.json({ success: true, message: "Please, check your email" });
  }
});

exports.updateUserDetail = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { name, age, address, phoneNumber, gender } = req.body;

  const user = await AuthSchema.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Not Found");
  }
  const updateDetail = await AuthSchema.findOneAndUpdate(
    { email },
    { name, age, address, phoneNumber, gender },
    { new: true }
  );

  res.json({
    success: true,
    message: "Successfully update detail",
    data: updateDetail,
  });
});
