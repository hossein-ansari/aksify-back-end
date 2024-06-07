const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: "true" },
  images: { type: "array", items: "any", required: "true" },
  shapes: { type: "array", items: "any", required: "true" },
  circles: { type: "array", items: "any", required: "true" },
  backGroundImage: { type: "object", required: "true" },
});
const productsModel = mongoose.model("lastChangesUser", schema);
module.exports = productsModel;
