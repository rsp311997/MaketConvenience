const createError = require('http-errors');
const CartModel = require('../models/cart.js');
const mongoose = require('../config/DBConfig');


//operations
//1. Get items from cart
//2. Add new Item to cart
//3. remove item from cart
//4. increase quantity of item in cart

exports.GetCartItemsByUserID = async (req, res, next) => {
    try {
        const isCartExist = await CartModel.find({ userID: req.params.id });
        let cart = undefined;
        if (isCartExist.length === 0) {
            cart = await CartModel.create({ userID: req.params.id, cartItems: [] });
        } else {
            //cart = await CartModel.find({userID:req.params.id},{cartItems:1});
            cart = await CartModel.aggregate([
                {
                    $lookup: {
                        from: "products",
                        localField: "cartItems.productID",
                        foreignField: "_id",
                        as: "cartItemsList"
                    },
                }
            ]);
        }
        for(let i=0;i<cart.length;i++){
            if(cart[i].userID.toString() === req.params.id){
                cart = cart[i]
            }
        }
        //console.log(cart);
        return res.status(200).json({
            status: true,
            message: "Cart items fetch successfully!",
            data: [cart]
        });
    } catch (Err) {
        // console.log(Err);
        return next(createError(500, Err.message));
    }
}

exports.AddNewCartItemByUserID = async (req, res, next) => {
    try {
        const isCartExist = await CartModel.find({ userID: req.params.id });
        let cart = undefined;
        if (isCartExist.length === 0) {
            //cart for the user does not exist.
            cart = await CartModel.create({ userID: req.params.id, cartItems: [{ productID: req.body.productID, quantity: req.body.quantity }] });
        } else {
            //cart for user does exist
            const isProductExist = await CartModel.find({ userID: req.params.id, "cartItems.productID": req.body.productID });
            if (isProductExist.length !== 0) {
                //product already exist in wishlist
                return next(createError(400, "Product already exist in cart!"));
            }
            cart = await CartModel.findOneAndUpdate({ userID: req.params.id }, {
                $push: { "cartItems": { "productID": req.body.productID, "quantity": req.body.quantity } }
            });
            cart = await CartModel.aggregate([
                {
                    $lookup: {
                        from: "products",
                        localField: "cartItems.productID",
                        foreignField: "_id",
                        as: "cartItemsList"
                    },
                }
            ]);
        }
        for(let i=0;i<cart.length;i++){
            if(cart[i].userID.toString() === req.params.id){
                cart = cart[i]
                break;
            }
        }
        return res.status(200).json({
            status: true,
            message: "Cart items added successfully!",
            data: [cart]
        });
    } catch (Err) {
        return next(createError(500, Err.message));
    }
}

exports.RemoveCartItemByUserID = async (req, res, next) => {
    try {
        let cart = undefined;
        const isProductExist = await CartModel.find({ userID: req.params.id, "cartItems.productID": req.body.productID });
        if (isProductExist.length === 0) {
            //product already exist in wishlist
            return next(createError(404, "Product not found in cart!"));
        }
        cart = await CartModel.updateOne({userID: req.params.id,"cartItems.productID": req.body.productID},{ $pull:{"cartItems":{"productID":req.body.productID}}});
        if(cart.acknowledged === false){
            return next(createError(400,"Failed to remove product from cart!"));
        }
        cart = await CartModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "cartItems.productID",
                    foreignField: "_id",
                    as: "cartItemsList"
                },
            }
        ]);
        for(let i=0;i<cart.length;i++){
            if(cart[i].userID.toString() === req.params.id){
                cart = cart[i]
                break;
            }
        }
        return res.status(200).json({
            status: true,
            message: "Cart items removed successfully!",
            data: [cart]
        });
    } catch (Err) {
        return next(createError(500, Err.message));
    }
}


exports.IncreaseQuantity = async (req,res,next) => {
    try{
        const isProductExistAndUpdate = await CartModel
                                .find({ userID: req.params.id, "cartItems.productID": req.body.productID})
                                .updateOne({$inc:{"cartItems.$.quantity":1}});
        if(isProductExistAndUpdate.acknowledged === false){
            return next(createError(500,"Failed to update quantity!"));
        }

        let cart = await CartModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "cartItems.productID",
                    foreignField: "_id",
                    as: "cartItemsList"
                },
            }
        ]);
        for(let i=0;i<cart.length;i++){
            if(cart[i].userID.toString() === req.params.id){
                cart = cart[i]
                break;
            }
        }
        return res.status(200).json({
            status: true,
            message: "Cart items quantity increase successfully!",
            data: [cart]
        });
    }catch(Err){
        return next(createError(500,Err.message));
    }
}

exports.DecreaseQuantity = async (req,res,next) => {
    try{
        const isProductExistAndUpdate = await CartModel
                                .find({ userID: req.params.id, "cartItems.productID": req.body.productID})
                                .updateOne({$inc:{"cartItems.$.quantity":-1}});
        if(isProductExistAndUpdate.acknowledged === false){
            return next(createError(500,"Failed to update quantity!"));
        }
        
        let cart = await CartModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "cartItems.productID",
                    foreignField: "_id",
                    as: "cartItemsList"
                },
            }
        ]);
        for(let i=0;i<cart.length;i++){
            if(cart[i].userID.toString() === req.params.id){
                cart = cart[i]
                break;
            }
        }
        return res.status(200).json({
            status: true,
            message: "Cart items quantity decrease successfully!",
            data: [cart]
        });
    }catch(Err){
        return next(createError(500,Err.message));
    }
}


exports.checkProductPresentInCartList = async (req,res,next) =>{
    try {
        let flag=false;
        let cartList = await CartModel.find({ userID: req.params.id, "cartItems.productID": req.query.productID})
        if (cartList.length === 0) {
            flag=false;
        } else {
            flag=true
        }

        return res.status(200).json({
            status: true,
            message: 'Successfully checked product in catList!',
            data: {flag:flag}
        });

    } catch (Err) {
        return next(createError(500, Err.errmsg));
    }
}


// exports.AddNewCart = (req, res, next) => {
//     try {
//         return res.send("My New cart");
//     } catch (Err) {
//         return res.status(500).json({
//             status: false,
//             message: Err
//         });
//     }
// }

// exports.GetAllCarts = (req, res, next) => {
//     try {
//         return res.send("All cart");
//     } catch (Err) {
//         return res.status(500).json({
//             status: false,
//             message: Err
//         });
//     }
// }


// exports.GetCart = (req, res, next) => {
//     try {
//         return res.send("My cart");
//     } catch (Err) {
//         return res.status(500).json({
//             status: false,
//             message: Err
//         });
//     }
// }

// exports.UpdateCart = (req, res, next) => {
//     try {
//         return res.send("Update cart");
//     } catch (Err) {
//         return res.status(500).json({
//             status: false,
//             message: Err
//         });
//     }
// }

// exports.DeleteCart = (req, res, next) => {
//     try {
//         return res.send("Delete cart");
//     } catch (Err) {
//         return res.status(500).json({
//             status: false,
//             message: Err
//         });
//     }
// }