const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: "String",
    required: "true",
  },

});
const subscriptionModel = mongoose.model('subscriptions',schema)
module.exports = subscriptionModel