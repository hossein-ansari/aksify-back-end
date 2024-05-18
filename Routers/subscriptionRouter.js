const express = require('express')
const subscriptionRouter = express.Router()
const subscriptionController = require('../controllers/subscriptionController')

subscriptionRouter.get('/getAll' , subscriptionController.getAll)

module.exports = subscriptionRouter