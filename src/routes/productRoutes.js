const express = require("express");
const { getAllProducts } = require("../controllers/productController");

const router = express.Router();

// Public: list all products/items
router.get("/", getAllProducts);

module.exports = router;

