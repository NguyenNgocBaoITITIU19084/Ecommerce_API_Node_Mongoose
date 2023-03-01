const express = require("express");
const authController = require("../controllers/authControllers");
const route = express.Router();

route.post("/register", authController.register);

module.exports = route;
