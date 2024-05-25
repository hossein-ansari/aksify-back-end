const mongoose = require("mongoose");
const schema = mongoose.Schema({
  images: { type: "String", required: "true" },
});
const imageUploadedByUserModel = mongoose.model("imageUploadedByUsers", schema);
module.exports = imageUploadedByUserModel;
