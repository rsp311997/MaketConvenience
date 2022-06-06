const express = require('express');

//Model
const ProductModel = require('../models/product.js');

//controllers
const productController = require('../controllers/product.js');
//middlewares
const Verify = require('../utilities/middlewares/auth.js');

const productRouters = express.Router();

productRouters.get('/',productController.GetAllProducts);

productRouters.get('/:id',productController.GetProductByID);

productRouters.post('/',productController.AddProduct);

productRouters.put('/:id', productController.UpdateProduct);

productRouters.delete('/:id', productController.DeleteProduct);

productRouters.get('/search/:keyword',productController.GetProductByKeyword);

module.exports = productRouters;