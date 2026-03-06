const express = require("express");
const {
  getCategories,
  updateCategories,
} = require("../controllers/categoryController");

const router = express.Router();

// Public: get available categories for filtering
router.get("/", getCategories);

// Admin: update categories list
router.put("/", updateCategories);

module.exports = router;

