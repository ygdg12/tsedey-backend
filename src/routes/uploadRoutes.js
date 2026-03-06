const express = require("express");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// Public endpoint used by the admin UI; Cloudinary auth is handled via env vars
router.post("/", uploadImage);

module.exports = router;

