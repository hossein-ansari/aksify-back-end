const express = require("express");
const usersRouters = express.Router();
const userController = require('../controllers/userController')

usersRouters.post("/create",userController.create )
usersRouters.post("/login",userController.login )
usersRouters.put("/update",userController.update )



module.exports = usersRouters;
