const tagsModel = require("../models/tagsModel");
const tagsValidator = require("../Validators/tagsValidator");
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
    const data = await tagsModel.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};