const express = require('express')
const productRouter = express.Router()
const productController = require('../controllers/productController')

productRouter.post('/create' , productController.create)

module.exports = productRouter