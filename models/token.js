const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "auth",
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
TokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: +process.env.TOKEN_EXPIRED }
);

module.exports = mongoose.model("token", TokenSchema);
