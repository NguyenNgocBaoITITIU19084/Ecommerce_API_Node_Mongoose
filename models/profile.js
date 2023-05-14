const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "auth",
  },
  firstName: {
    type: String,
    minlength: [3, "firstName name must be greater than 3 letters"],
    maxlength: [30, "firstName name must be less than 30 letters"],
  },
  lastName: {
    type: String,
    minlength: [3, "lastName name must be greater than 3 letters"],
    maxlength: [30, "lastName name must be less than 30 letters"],
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
  coins: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("profile", profileSchema);
