const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      minlenght: [6, "category length must be greater than 6, got {VALUE}"],
      maxlength: [30, "category name must be lessthan than 30, got {VALUE}"],
      unique: true,
    },
    description: {
      type: String,
      minlenght: [6, "category length must be greater than 6, got {VALUE}"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
    },
    updateBy: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("category", categorySchema);
