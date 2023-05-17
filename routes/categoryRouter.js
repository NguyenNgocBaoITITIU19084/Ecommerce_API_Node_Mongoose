const express = require("express");

const categoryController = require("../controllers/categoryController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLE } = require("../contants/role");
const router = express.Router();

router.post(
  "/",
  jwtAuth,
  authorize(ROLE.ADMIN, ROLE.SUPPLIER),
  categoryController.createCategory
);
router.get(
  "/",
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.getCategories
);
router.get(
  "/:id",
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.getCategoryById
);
router.delete(
  "/:id",
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.deleteCategoryById
);
router.patch(
  "/:id",
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.updateCategoryById
);
router.patch(
  "/set-active/:id",
  jwtAuth,
  authorize(ROLE.ADMIN),
  categoryController.bannedCategoryById
);

module.exports = router;
