const catchAsync = require("../middlewares/catchAsync");
const AuthSchema = require("../models/auth");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SERECT_KEY = process.env.SERECT_KEY;

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, age, address, phone, gender } = req.body;
  const existedAuth = await AuthSchema.create({
    name,
    email,
    password,
    age,
    address,
    phone,
    gender,
  });

  res.status(201).json({ succes: true, data: existedAuth });
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
  res.status(200).json({ succes: true, token: token });
});

exports.forget = catchAsync(async (req, res) => {
  const { email } = req.body;
  const existedEmail = await AuthSchema.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, "email or password is not valid");
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "ngocbao123steam@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  res.status(201).json({ sucess: true });
});

exports.updateDetail = catchAsync(async (req, res) => {
  const { name, age, phone, address, gender } = req.body;
  const auth = req.user.email;
  const update = await AuthSchema.findByIdAndUpdate(
    { email: auth },
    { name, age, phone, address, gender },
    { new: true }
  );
  res.status(201).json({ succes: true, data: update });
});

exports.changePassword = catchAsync(async (req, res) => {});
