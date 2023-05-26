const express = require("express");

const productController = require("../controllers/productController");
const { authorize } = require("../middlewares/authorize");
const { jwtAuth } = require("../middlewares/jwtAuth");
const uploadMongo = require("../middlewares/uploadsMongo");
const router = express.Router();

router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.get("/", productController.getProducts);
router.delete("/:id", productController.deleteProductById);
router.patch("/:id", productController.updateProductById);
router.post("/test", uploadMongo.single("image"), productController.test);

module.exports = router;
