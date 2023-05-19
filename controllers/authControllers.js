const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");

const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const EmailService = require("../utils/EmailService");
const CODE_TOKEN = require("../contants/codeToken");
const { STATUS_CODE } = require("../contants/statusCode");

const AuthSchema = require("../models/auth");
const TokenSchema = require("../models/token");
const ProfileSchema = require("../models/profile");

const SERECT_KEY = process.env.SERECT_KEY;

exports.register = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const userInfor = await AuthSchema.create({
    email,
    password,
  });
  const userId = await AuthSchema.findOne({ email });
  // Create and link profile for user
  const userProfile = await ProfileSchema.create({ userId });

  // Send Email
  // await EmailService.sendGmail(
  //   process.env.EMAIL,
  //   email,
  //   "Create Account At DevShop.",
  //   `Thanks for creating account at DevShop.`
  // );
  res.status(201).json({ successStatus: STATUS_CODE.SUCCESS, data: userInfor });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const existedEmail = await AuthSchema.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, "email or password is not valid");
  }
  // check active account
  if (!existedEmail.isActive) {
    throw new ApiError(403, "Your Account is banned");
  }
  const isMatch = bcrypt.compareSync(password, existedEmail.password);
  if (!isMatch) {
    throw new ApiError(400, "email or password is not valid");
  }
  const token = jwt.sign(
    {
      id: existedEmail._id,
      role: existedEmail.roles,
    },
    SERECT_KEY,
    { expiresIn: "1d" }
  );
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    access_token: token,
  });
});

exports.forgot = catchAsync(async (req, res) => {
  const { email } = req.body;
  const existedEmail = await AuthSchema.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, "email or password is not valid");
  }
  const isExistedToken = await TokenSchema.findOne({ userId: existedEmail.id });

  if (isExistedToken) {
    return res.json({
      success: true,
      message: "Please, check your email",
    });
  }

  const randoomToken = randomstring.generate(20);
  const salt = bcrypt.genSaltSync();
  const hashedToken = bcrypt.hashSync(randoomToken, salt);
  await TokenSchema.create({ userId: existedEmail.id, token: hashedToken });
  const link = `${process.env.WEB_URL}/?token=${randoomToken}&userId=${existedEmail.id}`;

  // await EmailService.sendGmail(
  //   process.env.EMAIL,
  //   email,
  //   "Reset Password",
  //   `Please click into this link ${link}`
  // );
  res.status(201).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Please, check your email",
    token: randoomToken,
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { token, userId, newPassword, confirmPassword } = req.body;
  if (!token) {
    throw new ApiError(404, "Invalid Token");
  }
  const isExistedToken = await TokenSchema.findOne({ userId: userId });
  if (!isExistedToken) {
    throw new ApiError(404, "Not Found");
  }
  const isMatched = bcrypt.compareSync(token, isExistedToken.token);
  if (!isMatched) {
    throw new ApiError(404, "Invalid Token");
  }
  const user = await AuthSchema.findOne({ _id: userId });
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Password does not match");
  }
  user.password = newPassword;

  const result = await user.save();
  if (result) {
    await TokenSchema.findOneAndDelete({ userId: userId });
  }

  // await EmailService.sendGmail(
  //   process.env.EMAIL,
  //   email,
  //   "Reset Password Successfully!",
  //   `your password have already updated`
  // );
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Please, check your email",
  });
});

exports.updatePassword = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await AuthSchema.findById(id);
  if (!user) {
    throw new ApiError(404, "Invalid Email");
  }
  const isMatched = bcrypt.compareSync(oldPassword, user.password);
  if (!isMatched) {
    throw new ApiError(400, "Password is Not Matched");
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Password does not match");
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
    res.status(200).json({
      successStatus: STATUS_CODE.SUCCESS,
      message: "Reset Password Successfully! .Please, check your email",
    });
  }
});

exports.updateUserDetail = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { firstName, lastName, age, address, phoneNumber, gender } = req.body;

  const user = await AuthSchema.findById(id);
  if (!user) {
    throw new ApiError(404, "Not Found User");
  }
  const userProfile = await ProfileSchema.findOneAndUpdate(
    { userId: id },
    {
      firstName,
      lastName,
      age,
      address,
      phoneNumber,
      gender,
    },
    { new: true }
  );
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Update Profile",
    data: userProfile,
  });
});

exports.getUserDetail = catchAsync(async (req, res) => {
  const { id } = req.user;
  const userProfile = await ProfileSchema.findOne({ userId: id }).populate({
    path: "accountDetail",
    select: "-_id -password",
  });
  res
    .status(200)
    .json({ successStatus: STATUS_CODE.SUCCESS, data: userProfile });
});
