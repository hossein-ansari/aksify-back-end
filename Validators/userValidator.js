const validator = require("fastest-validator");
const v = new validator();

const schema = {
  userName: {
    type: "string",
    min: 3,
    max: 25,
  },
  password: {
    type: "string",
    min: 8,
  },
  email: {
    type: "string",
    min: 12,
    max: 50,
  },
};
const check = v.compile(schema);
module.exports = check;
