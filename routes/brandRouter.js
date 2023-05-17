const express = require("express");
const brandController = require("../controllers/brandController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const route = express.Router();
route.post("/", brandController.createBrand);
module.exports = route;
