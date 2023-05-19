const express = require("express");
const authController = require("../controllers/authControllers");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { basicAuth } = require("../middlewares/basicAuth");
const route = express.Router();

route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/forgot-password", basicAuth, authController.forgot);
route.post("/reset-password", basicAuth, authController.resetPassword);
route.patch("/update-password", jwtAuth, authController.updatePassword);
route.patch("/update-user-detail", jwtAuth, authController.updateUserDetail);
route.get("/get-user-profile", jwtAuth, authController.getUserDetail);

module.exports = route;
