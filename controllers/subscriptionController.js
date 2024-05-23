const subscriptionModel = require("../models/subscriptionModel");
exports.getAll = async (req, res) => {
  try {
    const subscriptions = await subscriptionModel.find({});

    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " server error" });
  }
};
exports.create = async (req, res) => {
  try {
    const subscriptionCover = req.files["coverImage"][0].path;
    const { name, price, limitExport, saveImageCount } = req.body;
    const subscription = await subscriptionModel.create({
      name,
      price,
      limitExport,
      coverImage: subscriptionCover,
      saveImageCount,
    });
    res.status(200).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " server error" });
  }
};
