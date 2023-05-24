const express = require("express");

const uploadController = require("../controllers/uploadController");
const uploadMongo = require("../middlewares/uploadsMongo");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const route = express.Router();

route.post("/img", uploadMongo.array("images", 5), uploadController.uploadImg);
route.get("/img/:filename", uploadController.getImg);

route.post(
  "/cloud",
  uploadPhoto.array("images", 5),
  productImgResize,
  uploadController.uploadImgCloudinary
);

module.exports = route;
