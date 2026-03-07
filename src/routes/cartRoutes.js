const express = require("express");
const { getCart, updateCart } = require("../controllers/cartController");
const { anonymousCartMiddleware } = require("../middleware/anonymousAuth");

const router = express.Router();

router.use(anonymousCartMiddleware);

router.get("/", getCart);
router.put("/", updateCart);

module.exports = router;
