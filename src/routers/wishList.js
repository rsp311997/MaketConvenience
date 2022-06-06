const express = require('express');

const wishListContrller = require('../controllers/wishList');

const Verify = require('../utilities/middlewares/auth');

const wishListRouters = express.Router();

wishListRouters.get('/:id',Verify.verifyUser,wishListContrller.GetWishListByUserID);
wishListRouters.put('/:id',Verify.verifyUser,wishListContrller.AddProductToWishList);
wishListRouters.delete('/:id',Verify.verifyUser,wishListContrller.DeleteProductFromWishList);

wishListRouters.get('/check-product-exist/:id',Verify.verifyUser,wishListContrller.checkProductPresentInWishList);

module.exports = wishListRouters;
