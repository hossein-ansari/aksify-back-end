const validator = require("fastest-validator");
const v = new validator();

const schema = {
  name: {
    type: "string",
  },
  coverImage: {
    type: "string",
  },
  limitExport: {
    type: "Number",
  },
  price: {
    type: "Number",
  },
};
const check = v.compile(schema);
module.exports = check;
