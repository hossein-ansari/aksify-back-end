const productModel = require("../models/productsModel");
const productValidator = require("../Validators/productValidator");
const NodeCache = require("node-cache");
const client = new NodeCache();
exports.create = async (req, res) => {
  const isValid = productValidator(req.body);
  if (!isValid) {
    res.status(400).json({
      massage: "data is not valid",
    });
  }
  const { name, tags } = req.body;
  const coverImagePath = req.files["coverImage"][0].path;
  const productImagesPaths = req.files["productImages"].map(
    (file) => file.path
  );
  try {
    const products = await productModel.create({
      name,
      coverImage: coverImagePath,
      images: productImagesPaths,
      tags,
    });
    res
      .status(200)
      .json({ massage: `product ${name} created`, data: products });
  } catch (error) {
    res.status(500).json({ error: "server error", error });
  }
};
exports.getAll = async (req, res) => {
  try {
    const key = "AllProduct";
    let cachedData = client.get(key);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      return res.json(data);
    }
    const products = await productModel.find({});
    client.set(key, JSON.stringify(products), 3600);
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await productModel.findById(id);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ error: "server error", error });
  }
};
exports.searchItems = async (req, res) => {
  try {
    const query = req.query.word;
    const items = await productModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the name field
        { tags: { $elemMatch: { $regex: query, $options: "i" } } }, // Case-insensitive regex search within the tags array
      ],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getOneByImg = async (req, res) => {
  const {coverImage} = req.params
  try {
    const image = await productModel.find({coverImage:coverImage})
    res.status(200).json(image);
  } catch (err) {
    res.status(400).json(err);
  }
};