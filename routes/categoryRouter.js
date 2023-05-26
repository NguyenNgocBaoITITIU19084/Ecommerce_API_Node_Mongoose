const express = require("express");

const categoryController = require("../controllers/categoryController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const ADMIN_URL = process.env.ADMIN_URL;
const USER_URL = process.env.USER_URL;

const router = express.Router();

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategoriesForAdmin);
router.get("/:id", categoryController.getCategoryByIdForAdmin);
router.delete("/:id", categoryController.deleteCategoryById);
router.patch("/:id", categoryController.updateCategoryById);
router.patch("/set-active/:id", categoryController.bannedCategoryById);

router.get(`${USER_URL}/`, categoryController.getCategories);
router.get(`${USER_URL}/:id`, categoryController.getCategoryById);

router.get;

module.exports = router;
