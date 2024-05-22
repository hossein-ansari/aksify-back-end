const validator = require("fastest-validator");
const v = new validator();

const schema = {
  name: { type: "string" },
  images: { type: "array", items: 'any' },
  coverImage: { type: "string" }, 
  tags: {
    type: "array",
    items: "any",

    custom(value) {
      return (
        Array.isArray(value) && value.every((item) => typeof item === "any")
      );
    },
  },
};
const check = v.compile(schema);
module.exports = check;
