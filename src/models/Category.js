const mongoose = require("mongoose");

const categoryEntrySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, required: true, enum: ["all", "category", "vibe"] },
    value: { type: String, default: "" },
  },
  { _id: false }
);

const categoryConfigSchema = new mongoose.Schema(
  {
    key: { type: String, default: "default", unique: true },
    categories: [categoryEntrySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryConfig", categoryConfigSchema);
