const CATEGORY_DOC_ID = "default-categories";

// Default fallback categories, mirroring the frontend defaults
const DEFAULT_CATEGORIES = [
  { id: "all", label: "All looks", type: "all" },
  { id: "sets", label: "Sets", type: "category", value: "set" },
  { id: "jumpsuits", label: "Jumpsuits", type: "category", value: "jumpsuit" },
  { id: "studio", label: "Studio", type: "vibe", value: "studio" },
  { id: "training", label: "Training", type: "vibe", value: "training" },
];

// In-memory storage for simplicity; replace with a real model if needed
let storedCategories = null;

// GET /api/categories
const getCategories = async (req, res, next) => {
  try {
    if (!storedCategories) {
      storedCategories = DEFAULT_CATEGORIES;
    }
    res.json(storedCategories);
  } catch (err) {
    next(err);
  }
};

// PUT /api/categories
const updateCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
      return res
        .status(400)
        .json({ success: false, error: "categories must be an array" });
    }

    storedCategories = categories;

    res.json({ success: true, data: storedCategories, id: CATEGORY_DOC_ID });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, updateCategories, DEFAULT_CATEGORIES };

