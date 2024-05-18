const validator = require("fastest-validator");
const v = new validator();

const schema = {
  name: { type: "string" }, // Note: "String" should be lowercase "string"
  images: { type: "array", items: 'any' }, // Define an array of strings
  tags: {
    type: "array",
    items: "any",
    // Custom validation to ensure all elements are strings
    custom(value) {
      return (
        Array.isArray(value) && value.every((item) => typeof item === "any")
      );
    },
  },
};
const check = v.compile(schema);
module.exports = check;
