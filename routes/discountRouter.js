const express = require("express");
const discountController = require("../controllers/discountController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const ADMIN_URL = process.env.ADMIN_URL;
const USER_URL = process.env.USER_URL;
const route = express.Router();

route.post("/", jwtAuth, discountController.createDiscount);
route.get("/", discountController.getAllDiscount);
route.delete("/:id", discountController.deleteDiscountById);
route.get("/:id", jwtAuth, discountController.getDiscountById);
route.patch("/:id", jwtAuth, discountController.updateDiscountById);
route.patch("/banned/:id", jwtAuth, discountController.bannedDiscountById);

module.exports = route;
