const CategoryConfig = require("../models/Category");

const DEFAULT_CATEGORIES = [
  { id: "all", label: "All looks", type: "all", value: "" },
  { id: "sets", label: "Sets", type: "category", value: "set" },
  { id: "jumpsuits", label: "Jumpsuits", type: "category", value: "jumpsuit" },
  { id: "studio", label: "Studio", type: "vibe", value: "studio" },
  { id: "training", label: "Training", type: "vibe", value: "training" },
];

// GET /api/categories (public)
const getCategories = async (req, res, next) => {
  try {
    let config = await CategoryConfig.findOne({ key: "default" });
    if (!config || !config.categories?.length) {
      return res.json(DEFAULT_CATEGORIES);
    }
    res.json(config.categories);
  } catch (err) {
    next(err);
  }
};

// PUT /api/categories (admin only)
const updateCategories = async (req, res, next) => {
  try {
    const incoming = Array.isArray(req.body.categories) ? req.body.categories : [];

    const categories = incoming.map((cat) => {
      const label = (cat?.label || "").trim();
      const value = cat?.value ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : "");
      const id = cat?.id ?? value;
      const type = cat?.type || "category";
      return { id, label, type, value };
    });

    const config = await CategoryConfig.findOneAndUpdate(
      { key: "default" },
      { categories },
      { new: true, upsert: true }
    );

    res.json({ success: true, categories: config.categories });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, updateCategories, DEFAULT_CATEGORIES };
