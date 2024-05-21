const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userName: {
    type: "String",
    required: "true",
    minLength: 3,
    maxLength: 25,
  },
  password: {
    type: "String",
    required: "true",
    minLength: 8,
  },
  email: {
    type: "String",
    required: "true",
    minLength: 12,
    maxLength: 50,
  },
  subscriptionType: {
    type: "String",
    required: "false",
    default: 'member'
  },
});
const userModel = mongoose.model('users',schema)
module.exports = userModel
