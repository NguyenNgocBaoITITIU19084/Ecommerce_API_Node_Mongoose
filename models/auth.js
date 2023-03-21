const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");

const { ROLE } = require("../contants/role");

const Schema = mongoose.Schema;

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
      unique: true,
      required: [true, "email is required"],
      validate: {
        validator: function () {
          return validator.validate(this.email);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      minlength: [9, "password must be greater than 9 letters"],
      maxlength: [30, "password must be less than 30 letters"],
      required: [true, "password is required"],
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
      maxlength: [100, "address must be less than 100 letters"],
    },
    phoneNumber: {
      type: String,
      minlength: [10, "phone must be greater than or equal 10 numbers"],
      maxlength: [11, "phone must be less than or equal 11 numbers"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "unknown"],
        message: "{VALUE} is not gender",
      },
      default: "unknown",
    },
    roles: {
      type: String,
      enum: ROLE,
      default: ROLE.GUEST,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

authSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  }
});

module.exports = mongoose.model("auth", authSchema);
