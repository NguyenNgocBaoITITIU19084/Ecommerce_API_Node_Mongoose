const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "discount name is required"],
      minlenght: [6, "discount length must be greater than 6, got {VALUE}"],
      unique: true,
    },
    description: {
      type: String,
      minlenght: [6, "discount length must be greater than 6, got {VALUE}"],
    },
    discountPersent: {
      type: Number,
      required: [true, "discount persent is required"],
      min: [0, "discount persent must be greater than 0"],
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // createBy: {
    //   type: String,
    // },
    // updateBy: {
    //   type: String,
    // },
  },
  {
    collection: "discounts",
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("discount", discountSchema);
