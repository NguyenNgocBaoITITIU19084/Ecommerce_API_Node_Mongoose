const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brandSchema = new Schema({
  name: {
    type: String,
    required: [true, "brand name is required"],
    minlenght: [6, "brand length must be greater than 6, got {VALUE}"],
    maxlength: [30, "brand name must be lessthan than 30, got {VALUE}"],
  },
  description: {
    type: String,
    minlenght: [6, "category length must be greater than 6, got {VALUE}"],
  },
  image: {
    type: [String],
    required: [true, "image of brand is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createBy: {
    type: String,
  },
  updateBy: {
    type: String,
  },
});

module.exports = mongoose.model("brand", brandSchema);
