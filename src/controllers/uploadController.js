const cloudinary = require("../config/cloudinary");

// POST /api/upload-image
// Expects JSON { image: "<data-url-or-base64>" }
const uploadImage = async (req, res, next) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, error: "image field is required" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "tsedey-activeware/uploads",
    });

    return res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadImage };

