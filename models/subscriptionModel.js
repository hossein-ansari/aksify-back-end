const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: "String",
    required: "true",
  },
  coverImage: {
    type: "String",
    required: "true",
  },
  limitExport: {
    type: "Number",
    required: "true",
  },
  price: {
    type: "Number",
    required: "true",
  },

});
const subscriptionModel = mongoose.model('subscriptions',schema)
module.exports = subscriptionModel