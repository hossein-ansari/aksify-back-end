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
