const express = require("express");

const categoryController = require("../controllers/categoryController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");

const ADMIN_URL = process.env.ADMIN_URL;
const USER_URL = process.env.USER_URL;

const router = express.Router();

router.post(
  `${ADMIN_URL}/`,
  jwtAuth,
  authorize(ROLE.ADMIN, ROLE.SUPPLIER),
  categoryController.createCategory
);
router.get(
  `${ADMIN_URL}/`,
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.getCategoriesForAdmin
);
router.get(
  `${ADMIN_URL}/:id`,
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.getCategoryByIdForAdmin
);
router.delete(
  `${ADMIN_URL}/:id`,
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.deleteCategoryById
);
router.patch(
  `${ADMIN_URL}/:id`,
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.updateCategoryById
);
router.patch(
  `${ADMIN_URL}/set-active/:id`,
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.bannedCategoryById
);

router.get(`${USER_URL}/`, categoryController.getCategories);
router.get(`${USER_URL}/:id`, categoryController.getCategoryById);

router.get;

module.exports = router;
