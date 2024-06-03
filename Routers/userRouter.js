const express = require("express");
const usersRouters = express.Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../Middleware/jwtMiddleware');

usersRouters.post("/create",userController.create )
usersRouters.post("/login",userController.login )
usersRouters.put("/update",userController.update )
usersRouters.get('/user-data', authMiddleware.verifyToken, userController.getUserData);


module.exports = usersRouters;
