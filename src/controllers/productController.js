const Item = require("../models/Item");

// GET /api/products (public)
// Flattens Item documents into the shape expected by the frontend ShopContext
const getAllProducts = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    const products = items.map((item) => ({
      id: item._id,
      label: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      inStock: item.inStock,
      collection: item.collection,
    }));

    res.json(products);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts };

