const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const upload = require('../uploadersConfig/productConfig')
productRouter.post(
  "/create",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "productImages", maxCount: 5 },
  ]),
  productController.create
);
productRouter.get("/getAll", productController.getAll);
productRouter.get("/getOne/:id", productController.getOne);
productRouter.get("/searchItems", productController.searchItems);



module.exports = productRouter;
