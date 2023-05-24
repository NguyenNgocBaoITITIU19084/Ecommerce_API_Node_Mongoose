const multer = require("multer");

const path = require("path");

const ApiError = require("../utils/ApiError");

const fileFilter = (req, file, cb) => {
  const allowExtensions = ["jpg", "png", "gif", "jpeg"];
  const regex = new RegExp(`(${allowExtensions.join("|")})$`, "i");
  const fileExtension = path.extname(file.originalname);
  if (!regex.test(fileExtension)) {
    return cb(new ApiError(404, "File is not allow!"), false);
  }
  return cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage, fileFilter });

module.exports = { upload };
