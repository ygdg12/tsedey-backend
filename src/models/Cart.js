const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // product/item _id
    name: { type: String, required: true },
    image: { type: String },
    size: { type: String, default: "M" },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    price: { type: Number },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    anonymousUserId: { type: String, required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.index({ anonymousUserId: 1 });

module.exports = mongoose.model("Cart", cartSchema);
