const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

const ConnectDB = () => {
  mongoose
    .connect(DB_URI)
    .then(console.log("connect DB successfully!"))
    .catch((err) => {
      console.log("connect DB failed!");
    });
};
module.exports = ConnectDB;
