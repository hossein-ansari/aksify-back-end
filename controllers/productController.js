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
    const key = 'AllProduct';
    let cachedData = client.get(key);
    if (cachedData) {
      console.log('cache');
      const data = JSON.parse(cachedData);
      return res.json(data); // Use return to exit after sending the response
    } 
    const products = await productModel.find({});
    client.set(key, JSON.stringify(products), 3600);
    return res.status(200).json(products); // Use return to exit after sending the response

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" }); // Use return to exit after sending the response
  }
};
exports.getOne = async (req, res) => {
  const id = req.params.id;
  const key = "oneProduct";
  const cachedData = await client.get(key);
  try {
    if (cachedData) {
      const data = JSON.parse(cachedData);
      res.json(data);
    } else {
      const products = await productModel.findById(id);
      client.set(key, JSON.stringify(products), "EX", 3600);
      res.status(200).json(products);
    }
    if (!products) {
      res.status(404).json({ massage: "not found" });
    }
  } catch (error) {
    res.status(404).json({ error: "server error", error });
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
