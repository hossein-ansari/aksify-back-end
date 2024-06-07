const validator = require("fastest-validator");
const v = new validator();

const schema = {
  userId: { type: "string" },
  images: { type: "array", items: "any" },
  shapes: { type: "array", items: "any" },
  circles: { type: "array", items: "any" },
  backGroundImage: { type: "string" },
};
const check = v.compile(schema);
module.exports = check;
