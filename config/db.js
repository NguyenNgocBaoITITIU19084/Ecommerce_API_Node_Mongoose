const mongoose = require("mongoose");

class Mongo {
  constructor() {
    this.gridfs = null;
  }
  static connect = () => {
    mongoose
      .connect(process.env.DB_URI)
      .then(console.log("Success Connection to DB"))
      .catch("Failed to Connection to DB");
    const conn = mongoose.connection;
    conn.once("open", () => {
      // connect gridfs
      this.gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: process.env.BUCKET_NAME,
      });
    });
  };
}

module.exports = Mongo;
