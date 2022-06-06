const express = require('express');

//Controller
const cartController = require('../controllers/cart.js');

const cartRouters = express.Router();

// cartRouters.post('/',cartController.AddNewCart);
// cartRouters.get('/',cartController.GetAllCarts);
// cartRouters.get('/:id',cartController.GetCart);
// cartRouters.put('/:id',cartController.UpdateCart);
// cartRouters.delete('/:id',cartController.DeleteCart);

cartRouters.get('/items/:id',cartController.GetCartItemsByUserID);
cartRouters.put('/items/:id',cartController.AddNewCartItemByUserID);
cartRouters.delete('/items/:id',cartController.RemoveCartItemByUserID);

cartRouters.put('/items/i-quantity/:id',cartController.IncreaseQuantity);
cartRouters.put('/items/d-quantity/:id',cartController.DecreaseQuantity);

cartRouters.get('/items/check-product-exist/:id',cartController.checkProductPresentInCartList);


module.exports = cartRouters;