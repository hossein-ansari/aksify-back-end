const subscriptionModel = require("../models/subscriptionModel");
const NodeCache = require("node-cache");
const client = new NodeCache();

exports.getAll = async (req, res) => {
  try {
    const key = 'subscription';
    let cachedData = client.get(key);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      return res.json(data);
    } 
    const subscriptions = await subscriptionModel.find({});
    client.set(key, JSON.stringify(subscriptions), 3600);
    return res.status(200).json(subscriptions); 
  } catch (error) {
    return res.status(500).json({ error: " server error" });
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
