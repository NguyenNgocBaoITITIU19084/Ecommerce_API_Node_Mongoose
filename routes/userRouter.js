const express = require("express");

const UserController = require("../controllers/userController");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserDetailById);
router.get("/", UserController.getUserByEmail);
router.delete("/:id", UserController.deleteUserById);
router.delete("/", UserController.deleteUserByEmail);
router.patch("/set-active/:id", UserController.setActiveUserById);
router.post("/add-user", UserController.AddUser);

module.exports = router;
