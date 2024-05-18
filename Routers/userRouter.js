const express = require("express");
const usersRouters = express.Router();
const userController = require('../controllers/userController')

usersRouters.post("/create",userController.create )
usersRouters.post("/login",userController.login )


module.exports = usersRouters;
