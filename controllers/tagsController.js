const tagsModel = require("../models/tagsModel");
const tagsValidator = require("../Validators/tagsValidator");
const NodeCache = require("node-cache");
const client = new NodeCache();

exports.create = async (req, res) => {
    const isValid = tagsValidator(req.body);
    if (!isValid) {
      res.status(400).json({
        massage: "data is not valid",
      });
    }
  try {
    const {name} = req.body
    const data = await tagsModel.create({
      name: name,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.getAll = async (req, res) => {
  try {
    const key = 'tags';
    let cachedData = client.get(key);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      return res.json(data);
    } 
    const data = await tagsModel.find({});
    client.set(key, JSON.stringify(data), 3600);
    return res.status(200).json(data); 
  } catch (err) {
    res.status(400).json(err);
  }
};