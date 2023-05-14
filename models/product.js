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
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [1000, "price must be greater than 1000, got {VALUE}"],
    },
    image: {
      type: [String],
      required: [true, "image product is required"],
    },
    inStock: {
      type: Number,
      required: [true, "inStock is required"],
      min: [1, "inStock of product must be greater than 1"],
      default: 1,
    },
    discount: {
      type: [Schema.Types.ObjectId],
      ref: "discount",
    },
    category: {
      type: [Schema.Types.ObjectId],
      ref: "category",
      required: [true, "category product is required"],
    },
    brand: {
      type: [Schema.Types.ObjectId],
      ref: "brand",
      required: [true, "brand product is required"],
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
    importPrice: {
      type: Number,
      min: [1000, "price must be greater than 1000, got {VALUE}"],
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("product", productSchema);
