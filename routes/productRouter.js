const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);

module.exports = router;
