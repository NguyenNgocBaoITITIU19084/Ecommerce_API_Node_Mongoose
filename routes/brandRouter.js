const express = require("express");
const brandController = require("../controllers/brandController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const ADMIN_URL = process.env.ADMIN_URL;
const USER_URL = process.env.USER_URL;

const route = express.Router();

route.post("/", jwtAuth, brandController.createBrand);
route.get("/", brandController.getAllBrands);
route.get("/:id", brandController.getBrandById);
route.delete("/:id", brandController.deleteBrandById);
route.patch("/:id", jwtAuth, brandController.updateBrandById);
route.patch("/banned/:id", jwtAuth, brandController.bannedBrandById);

module.exports = route;
