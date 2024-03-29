const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SERECT,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return await cloudinary.uploader.upload(fileToUploads, (result) => {
    const uploadIMG = {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
    return uploadIMG;
  });
};
const cloudinaryDeleteImg = async (fileToDelete) => {
  return await cloudinary.uploader.destroy(fileToDelete, (result) => {
    const deleteIMG = {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
    return deleteIMG;
  });
};
module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
