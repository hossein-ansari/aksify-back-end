const express = require("express");
const lastChangesRouter = express.Router();
const lastChangesController = require("../controllers/lastChanges");
lastChangesRouter.post("/create", lastChangesController.create);
lastChangesRouter.get("/getOne", lastChangesController.getOne);

module.exports = lastChangesRouter;
