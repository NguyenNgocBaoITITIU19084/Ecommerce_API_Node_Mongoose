const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      minlength: [6, "product name must be greater than 6, got {VALUE}"],
      maxlength: [100, "product name must be lessthan than 100, got {VALUE}"],
    },
    description: {
      type: String,
    },
    code: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [1000, "price must be greater than 1000, got {VALUE}"],
    },
    importPrice: {
      type: Number,
      min: [1000, "price must be greater than 1000, got {VALUE}"],
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: "discount",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "category product is required"],
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("product", productSchema);
