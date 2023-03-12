const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "discount name is required"],
      minlenght: [6, "discount length must be greater than 6, got {VALUE}"],
    },
    description: {
      type: String,
      minlenght: [6, "discount length must be greater than 6, got {VALUE}"],
    },
    discountPersent: {
      type: Number,
      required: [true, "discount persent is required"],
      min: [0, "discount persent must be greater than 0"],
    },
    isActive: {
      type: Boolean,
      required: true,
      enum: {
        values: ["true", "false"],
        message: "{VALUE} is not supported",
      },
      default: "false",
    },
  },
  {
    collection: "discounts",
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("discount", discountSchema);
