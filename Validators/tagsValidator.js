const validator = require("fastest-validator");
const v = new validator();

const schema = {
  name: {
    type: "string",
  },
};
const check = v.compile(schema);
module.exports = check;
