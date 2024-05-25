const express = require("express");
const imageUploadedByUserRouter = express.Router();
const imageUploadedByUserController = require("../controllers/imageUploadedByUserController");
const upload = require('../uploadersConfig/imageUploadedByUserConfig')
imageUploadedByUserRouter.post(
  "/create",
  upload.fields([
    { name: "images", maxCount: 1 },
  ]),
  imageUploadedByUserController.create
);


module.exports = imageUploadedByUserRouter;
