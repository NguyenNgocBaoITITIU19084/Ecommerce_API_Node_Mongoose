const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
    },
    firstName: {
      type: String,
      minlength: [3, "firstName name must be greater than 3 letters"],
      maxlength: [30, "firstName name must be less than 30 letters"],
      default: null,
    },
    lastName: {
      type: String,
      minlength: [3, "lastName name must be greater than 3 letters"],
      maxlength: [30, "lastName name must be less than 30 letters"],
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    address: {
      type: String,
      maxlength: [100, "address must be less than 100 letters"],
      default: null,
    },
    phoneNumber: {
      type: String,
      minlength: [10, "phone must be greater than or equal 10 numbers"],
      maxlength: [11, "phone must be less than or equal 11 numbers"],
      default: null,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "unknown"],
        message: "{VALUE} is not gender",
      },
      default: "unknown",
    },
    coins: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

profileSchema.virtual("accountDetail", {
  ref: "auth",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("profile", profileSchema);
