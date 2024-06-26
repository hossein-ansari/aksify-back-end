const express = require("express");
const usersRouters = express.Router();
const userController = require('../controllers/userController')

usersRouters.post("/create",userController.create )
usersRouters.post("/login",userController.login )
usersRouters.put("/update",userController.update )
usersRouters.get('/user-data', userController.verifyToken, userController.getUserData);
usersRouters.put("/decreaseExport/:userName",userController.decreaseExport,userController.getUserData )
usersRouters.post('/logout', userController.logout);
module.exports = usersRouters;
