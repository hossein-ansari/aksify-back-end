const express = require("express");
const lastChangesRouter = express.Router();
const lastChangesController = require("../controllers/lastChanges");
lastChangesRouter.post("/create", lastChangesController.create);
lastChangesRouter.put("/update/:id", lastChangesController.update);
lastChangesRouter.get("/getOne/:userId", lastChangesController.getOne);
lastChangesRouter.get("/getOneLast/:id", lastChangesController.getOneLast);


module.exports = lastChangesRouter;
