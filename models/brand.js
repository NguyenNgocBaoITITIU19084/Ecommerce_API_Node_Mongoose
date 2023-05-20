const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      minlenght: [
        6,
        "length of brand name must be greater than 6, got {VALUE}",
      ],
      maxlength: [
        30,
        "length of brand name must be lessthan than 30, got {VALUE}",
      ],
      unique: true,
    },
    description: {
      type: String,
      minlenght: [6, "brand description must be greater than 6, got {VALUE}"],
    },
    images: {
      type: [String],
      required: [true, "image of brand is required"],
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
    timestamps: true,
  }
);
mongoose.set("runValidators", true);

module.exports = mongoose.model("brand", brandSchema);
