const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const adminAuthMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public: list all products/items
router.get("/", getAllProducts);

// Admin-only: create/update/delete products from the admin UI
router.post("/", adminAuthMiddleware, createProduct);
router.put("/:id", adminAuthMiddleware, updateProduct);
router.delete("/:id", adminAuthMiddleware, deleteProduct);

module.exports = router;


