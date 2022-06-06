const express = require('express');

const authRoutes = require('./auth.js');
const userRoutes = require('./user.js');
const productRoutes = require('./product.js');
const cartRoutes = require('./cart.js');
const orderRoutes = require('./order.js');
const reviewRoutes = require('./review.js');
const notificationRoutes = require('./notification.js');
const wishListRoutes = require('./wishList');

const routers = express.Router();

routers.use('/auth',authRoutes);
routers.use('/user',userRoutes);
routers.use('/product',productRoutes);
routers.use('/cart',cartRoutes);
routers.use('/order',orderRoutes);
routers.use('/review',reviewRoutes);
routers.use('/notification',notificationRoutes);
routers.use('/wishList',wishListRoutes);


module.exports = routers;