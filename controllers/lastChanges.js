const lastChangesModel = require("../models/lastChanges");
const Validator = require("../Validators/lastChanges");
exports.getOne = async (req, res) => {
  try {
    const { userId } = req.params;
    const allChanges = await lastChangesModel.find({ userId: userId });
    return res.status(200).json(allChanges);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
exports.create = async (req, res) => {
  const isValid = Validator(req.body);
  if (!isValid) {
    res.status(422).json(isValid);
  }
  try {
    const { userId, images, shapes, circles, backGroundImage } = req.body;
    const lastChanges = await lastChangesModel.create({
      userId,
      images,
      shapes,
      circles,
      backGroundImage,
    });
    res.status(200).json(lastChanges);
  } catch (error) {
    res.status(500).json({ error: " server error" });
  }
};
exports.update = async (req, res) => {
  const isValid = Validator(req.body);
  if (!isValid) {
    res.status(422).json(isValid);
  }
  try {
    const id = req.params.id
    const { userId, images, shapes, circles, backGroundImage } = req.body;
    const lastChanges = await lastChangesModel.findByIdAndUpdate(
      id,
      {
      userId,
      images,
      shapes,
      circles,
      backGroundImage,
    });
    res.status(200).json(lastChanges);
  } catch (error) {
    res.status(500).json({ error: " server error" });
  }
};
exports.getOneLast = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await lastChangesModel.findById(id).select('-userId -__v');
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
