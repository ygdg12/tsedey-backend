const Cart = require("../models/Cart");

// GET /api/cart — requires X-Anonymous-User-Id header
const getCart = async (req, res, next) => {
  try {
    const anonymousUserId = req.anonymousUserId;
    if (!anonymousUserId) {
      return res.status(400).json({
        success: false,
        error: "X-Anonymous-User-Id header is required",
      });
    }

    const cart = await Cart.findOne({ anonymousUserId });
    const items = cart?.items ?? [];
    res.json({ items });
  } catch (err) {
    next(err);
  }
};

// PUT /api/cart — requires X-Anonymous-User-Id header, body: { items: [...] }
const updateCart = async (req, res, next) => {
  try {
    const anonymousUserId = req.anonymousUserId;
    if (!anonymousUserId) {
      return res.status(400).json({
        success: false,
        error: "X-Anonymous-User-Id header is required",
      });
    }

    const incoming = Array.isArray(req.body?.items) ? req.body.items : [];
    const items = incoming.map((item) => ({
      id: String(item?.id ?? ""),
      name: String(item?.name ?? ""),
      image: item?.image != null ? String(item.image) : undefined,
      size: String(item?.size ?? "M"),
      quantity: Math.max(1, Number(item?.quantity) || 1),
      price: item?.price != null ? Number(item.price) : undefined,
    })).filter((item) => item.id && item.name);

    const cart = await Cart.findOneAndUpdate(
      { anonymousUserId },
      { items },
      { new: true, upsert: true }
    );

    res.json({ success: true, items: cart.items });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCart, updateCart };
