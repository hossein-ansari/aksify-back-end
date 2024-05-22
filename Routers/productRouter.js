const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const upload = require('../productImagesUpload/config')
productRouter.post(
  "/create",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "productImages", maxCount: 5 },
  ]),
  productController.create
);
productRouter.get("/getAll", productController.getAll);

module.exports = productRouter;
