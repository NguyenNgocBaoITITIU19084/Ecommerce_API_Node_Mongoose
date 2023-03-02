const express = require("express");
const authController = require("../controllers/authControllers");
const route = express.Router();

route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/forgot", authController.forget);
route.patch("update-detail", authController.updateDetail);

module.exports = route;
