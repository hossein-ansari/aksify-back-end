const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: "String",
    required: true,
    minLength: 2,
  },
  images: { type: "array", items: 'any' },
  tags: {
    type: [String],
    required: "true",
    validate: {
      validator: function (value) {
        // Custom validation to ensure all elements are strings
        return (
          Array.isArray(value) &&
          value.every((item) => typeof item === "string")
        );
      },
      message: "Products must be an array of strings",
    },
  },
});
const productsModel = mongoose.model('products',schema)
module.exports = productsModel