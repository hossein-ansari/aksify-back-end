const express = require("express");
const subscriptionRouter = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const upload = require("../uploadersConfig/subscriptionConfig");

subscriptionRouter.get("/getAll", subscriptionController.getAll);
subscriptionRouter.post(
  "/create",
  upload.fields([{ name: "coverImage", maxCount: 1 }]),
  subscriptionController.create
);

module.exports = subscriptionRouter;
