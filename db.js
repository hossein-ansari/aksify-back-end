const mongoose = require("mongoose");
require('dotenv').config();
const dbUrl = process.env.dbUrl;
mongoose
  .connect(dbUrl)
  .then(() => { 
    console.log("connect to data base");
  })
  .catch((err) => {
    console.log(err);
  });