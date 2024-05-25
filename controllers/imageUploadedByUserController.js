const imageUploadedByUserModel = require("../models/imageUploadedByUserModel");
const { isValidObjectId } = require("mongoose");
exports.create = async (req, res) => {
  try {
    const userUploadedImagesPaths = req.files["images"][0].path
    const data = await imageUploadedByUserModel.create({
      name: 'image',
      images: userUploadedImagesPaths,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
