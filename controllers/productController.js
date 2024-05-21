const productModel = require("../models/productsModel");
const productValidator = require("../Validators/productValidator");
exports.create = async (req, res) => {
  const isValid = productValidator(req.body);
  if (!isValid) {
    res.status(400).json({
      massage: "data is not valid",
    });
  }
  const { name, images, tags } = req.body;
  try {
    const products = await productModel.create({ name, images, tags });
    res
      .status(200)
      .json({ massage: `product ${name} created`, data: products });
  } catch (error) {
    res.status(500).json({ error: "server error", error });
  }
};
exports.getAll = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (!products) {
      res.status(404).json({ massage: "not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "server error", error });
  }
};
