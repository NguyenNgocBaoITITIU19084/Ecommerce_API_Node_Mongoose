const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ROLE } = require("../contants/role");
const bcrypt = require("bcryptjs");

const authSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, "user name must be greater than 3 letters"],
      maxlength: [30, "user name must be less than 30 letters"],
    },
    email: {
      type: String,
      minlength: [3, "email must be greater than 3 letters"],
      maxlength: [30, "email must be less than 30 letters"],
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [9, "password must be greater than 3 letters"],
      maxlength: [30, "password must be less than 30 letters"],
      required: [true, "password is required"],
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
      enum: ROLE,
      default: ROLE.GUEST,
    },
  },
  {
    timestamps: true,
  }
);

authSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(11);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  }
});

module.exports = mongoose.model("auth", authSchema);
