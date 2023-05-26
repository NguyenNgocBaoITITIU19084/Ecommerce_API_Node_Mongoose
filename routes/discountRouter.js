const express = require("express");
const discountController = require("../controllers/discountController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const ADMIN_URL = process.env.ADMIN_URL;
const USER_URL = process.env.USER_URL;
const route = express.Router();

route.post("/", discountController.createDiscount);
route.get("/", discountController.getAllDiscount);
route.delete("/:id", discountController.deleteDiscountById);
route.get("/:id", discountController.getDiscountById);
route.patch("/:id", discountController.updateDiscountById);
route.patch("/banned/:id", discountController.bannedDiscountById);

module.exports = route;
