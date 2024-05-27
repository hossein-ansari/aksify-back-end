const express = require("express");
const tagsRouter = express.Router();
const productController = require("../controllers/tagsController");

tagsRouter.get("/getAll", productController.getAll);
tagsRouter.post("/create", productController.create);

module.exports = tagsRouter;
