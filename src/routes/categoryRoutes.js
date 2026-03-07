const express = require("express");
const {
  getCategories,
  updateCategories,
} = require("../controllers/categoryController");
const adminAuthMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public: get available categories for filtering
router.get("/", getCategories);

// Admin only: update categories list
router.put("/", adminAuthMiddleware, updateCategories);

module.exports = router;

