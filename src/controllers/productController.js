const Item = require("../models/Item");
const Collection = require("../models/Collection");

// Helper: find or create a default collection for products created via /api/products
const getOrCreateDefaultCollection = async () => {
  let collection = await Collection.findOne({ name: "Default Collection" });
  if (!collection) {
    collection = await Collection.create({
      name: "Default Collection",
      description: "Auto-created collection for products API",
    });
  }
  return collection;
};

// Shape mapping between Item documents and frontend "product" objects
const mapItemToProduct = (item) => ({
  id: item._id,
  label: item.name,
  price: item.price,
  image: item.image,
  description: item.description,
  inStock: item.inStock,
  soldOut: item.inStock === false,
  collection: item.collection,
});

// GET /api/products (public)
// Flattens Item documents into the shape expected by the frontend ShopContext
const getAllProducts = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    const products = items.map(mapItemToProduct);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// POST /api/products (admin via token)
// Expects JSON body from Collection.jsx/ShopContext:
// { label, description, price, tag, intensity, category, vibe, soldOut, colorsAvailable, image }
const createProduct = async (req, res, next) => {
  try {
    const {
      label,
      description,
      price,
      soldOut,
      image,
      // extra fields are accepted but currently ignored by the Item schema
    } = req.body;

    if (!label || price === undefined) {
      return res
        .status(400)
        .json({ success: false, error: "label and price are required" });
    }

    const defaultCollection = await getOrCreateDefaultCollection();

    const item = await Item.create({
      collection: defaultCollection._id,
      name: label,
      description,
      price,
      inStock: soldOut ? false : true,
      image,
    });

    res.status(201).json({ success: true, data: mapItemToProduct(item) });
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id (admin via token)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      label,
      description,
      price,
      soldOut,
      image,
      // other optional fields ignored for now
    } = req.body;

    const item = await Item.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    if (label !== undefined) item.name = label;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;
    if (soldOut !== undefined) item.inStock = soldOut ? false : true;
    if (image !== undefined) item.image = image;

    await item.save();

    res.json({ success: true, data: mapItemToProduct(item) });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id (admin via token)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    await item.deleteOne();
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};


