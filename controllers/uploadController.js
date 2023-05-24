const catchAsync = require("../middlewares/catchAsync");
const Mongo = require("../config/db");
const { STATUS_CODE } = require("../contants/statusCode");
const ApiError = require("../utils/ApiError");
const { cloudinaryUploadImg } = require("../utils/cloudinary");
const fs = require("fs");
exports.uploadImg = catchAsync(async (req, res) => {
  const files = req.files;
  const filenames = files.map((value, index, array) => {
    return value.filename;
  });
  res.status(200).json({
    successStatus: STATUS_CODE.SUCCESS,
    message: "Successfully Update Image",
    data: filenames,
  });
});

exports.getImg = catchAsync(async (req, res, next) => {
  const { filename } = req.params;
  await Mongo.gridfs.find({ filename }).toArray((err, file) => {
    console.log("----------------", file);
    if (err || !file || !file.length) {
      return next(new ApiError(404, "Not Found"));
    }
    Mongo.gridfs.openDownloadStreamByName(filename).pipe(res);
  });
});

exports.uploadImgCloudinary = catchAsync(async (req, res) => {
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newpath = await cloudinaryUploadImg(path, "images");
    urls.push(newpath.secure_url);
    fs.unlinkSync(path);
  }
  const images = urls.map((file) => {
    return file;
  });
  res.send(images);
});
