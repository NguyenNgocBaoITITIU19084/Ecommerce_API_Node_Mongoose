const express = require("express");

const categoryController = require("../controllers/categoryController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const ADMIN_URL = process.env.ADMIN_URL;
const USER_URL = process.env.USER_URL;

const router = express.Router();

router.post("/", jwtAuth, categoryController.createCategory);
router.get("/", categoryController.getCategoriesForAdmin);
router.get("/:id", categoryController.getCategoryByIdForAdmin);
router.delete("/:id", jwtAuth, categoryController.deleteCategoryById);
router.patch("/:id", jwtAuth, categoryController.updateCategoryById);
router.patch("/set-active/:id", jwtAuth, categoryController.bannedCategoryById);

router.get(`${USER_URL}/`, categoryController.getCategories);
router.get(`${USER_URL}/:id`, categoryController.getCategoryById);

router.get;

module.exports = router;
