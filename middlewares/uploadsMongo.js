const multer = require("multer");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const ApiError = require("../utils/ApiError");

const fileFilter = (req, file, cb) => {
  const allowExtensions = ["jpg", "png", "gif", "jpeg"];
  const fileExtension = path.extname(file.originalname);

  const regex = new RegExp(`(${allowExtensions.join("|")})$`, "i");
  if (!regex.test(fileExtension)) {
    return cb(new ApiError(404, "File is not allow!"), false);
  }
  return cb(null, true);
};

const storage = new GridFsStorage({
  url: process.env.DB_URI,
  file: (req, file) => {
    return {
      filename: `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`,
      bucketName: process.env.BUCKET_NAME,
    };
  },
});

const uploadMongo = multer({ storage, fileFilter });

module.exports = uploadMongo;
