const express = require("express");

const productController = require("../controllers/productController");
const { authorize } = require("../middlewares/authorize");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.get("/", jwtAuth, productController.getProducts);
router.delete("/:id", productController.deleteProductById);
router.patch("/:id", productController.updateProductById);

module.exports = router;
