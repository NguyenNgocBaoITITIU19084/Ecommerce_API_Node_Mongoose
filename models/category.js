const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      minlenght: [6, "category length must be greater than 6, got {VALUE}"],
    },
    description: {
      type: String,
      minlenght: [6, "category length must be greater than 6, got {VALUE}"],
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("category", categorySchema);
