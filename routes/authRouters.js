const express = require("express");
const authController = require("../controllers/authControllers");
const route = express.Router();

route.post("/register", authController.register);
route.post("/login", authController.login);

module.exports = route;
