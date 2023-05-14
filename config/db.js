const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

const ConnectDB = () => {
  mongoose
    .connect(DB_URI)
    .then(console.log("Connect Mongo DB successfully!"))
    .catch((err) => {
      console.log("Connect Mongo DB failed!");
    });
};
module.exports = ConnectDB;
