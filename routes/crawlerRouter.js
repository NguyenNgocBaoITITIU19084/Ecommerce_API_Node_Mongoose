const express = require("express");
const crawlerController = require("../controllers/crawlerController");
const router = express.Router();

router.get("/", crawlerController.crawler);

module.exports = router;
