const createError = require('http-errors');
const WishListModel = require('../models/wishList');


exports.GetWishListByUserID = async (req, res, next) => {
    try {
        let WishList = await WishListModel.find({ userID: req.params.id }, { __v: 0 });
        if (WishList.length === 0) {
            WishList = await WishListModel.create(
                {
                    userID: req.params.id,
                    productID: []
                },
            );
        } else {
            WishList = await WishListModel.aggregate([
                {
                    $lookup: {
                        from: "products",
                        localField: "productID",
                        foreignField: "_id",
                        as: "productList"
                    },
                }
            ]);
        }

        return res.status(200).json({
            status: false,
            message: 'Wish List fetch successfully!',
            data: WishList
        });

    } catch (Err) {
        return next(createError(500, Err.errmsg));
    }
}


exports.AddProductToWishList = async (req, res, next) => {
    try {
        const isWishListExist = await WishListModel.find({ userID: req.body.userID });
        let WishList = undefined
        if (isWishListExist.length !== 0) {
            //wish list for the user already exist
            const isProductExist = await WishListModel.find({ userID: req.body.userID,productID: req.body.productID });
            if (isProductExist.length !== 0) {
                //product already exist in wishlist
                return next(createError(400, "Product already exist in wishlist!"));
            }
            //New product is provided below code will add new product to wish list 
            WishList = await WishListModel.findOneAndUpdate(
                { userID: req.body.userID },
                {
                    $push: { "productID": req.body.productID }
                },
            );
        } else {
            //Wish list for the user not found

            //New wish list created
            await WishListModel.create(
                {
                    userID: req.body.userID,
                    productID: [req.body.productID]
                },
            );
        }

        WishList = await WishListModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productList"
                },
            }
        ]);

        if (WishList == null) {
            return next(createError(400, 'Failed to Add new product in wish list!'));
        }
        return res.status(200).json({
            status: true,
            message: 'New product added into wishlist successfully!',
            data: WishList
        });
    } catch (Err) {
        return next(createError(500, Err.message));
    }
}


exports.DeleteProductFromWishList = async (req, res, next) => {
    try {
        //wish list for user does exist
        const isProductExist = await WishListModel.find({ userID:req.params.id,productID: req.body.productID});
        let WishList = undefined;
        if (isProductExist.length === 0) {
            //product does not exist in wishlist
            return next(createError(400, "Product does not exist in wishlist!"));
        } else {
            WishList = await WishListModel.updateOne(
                { userID: req.body.userID },
                {
                    $pull: { "productID": req.body.productID }
                },
                {new:true}
            );
        }
        if(WishList.acknowledged === false){
            return next(createError(500, Err.message));
        }

        WishList = await WishListModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productList"
                },
            }
        ]);

        return res.status(200).json({
            status: true,
            message: 'Product removed from wishlist successfully!',
            data: WishList
        });
    } catch (Err) {
        return next(createError(500, Err.message));
    }
}


exports.checkProductPresentInWishList = async (req,res,next) =>{
    try {
        let flag=false;
        let WishList = await WishListModel.find({ userID: req.params.id,productID: req.query.productID });
        if (WishList.length === 0) {
            flag=false;
        } else {
            flag=true
        }

        return res.status(200).json({
            status: true,
            message: 'Successfully checked product in wishlist!',
            data: {flag:flag}
        });

    } catch (Err) {
        return next(createError(500, Err.errmsg));
    }
}
// exports.GetAllWishList = async (req, res, next) => {
//     try {
//         const AllWishList = await WishListModel.find({}, { __v: 0 });
//         res.status(200).json({
//             status: true,
//             data: AllWishList
//         });
//     } catch (Err) {
//         res.status(500).json({
//             status: false,
//             error: Err.errmsg
//         });
//     }
// }

// exports.UpdateWishList = async (req, res, next) => {
    //     try {
    //         const UpdatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //         if (UpdatedProduct == null) {
    //             res.status(404).json({
    //                 status: false,
    //                 message: 'Product not found!'
    //             });
    //         } else {
    //             res.status(200).json({
    //                 status: true,
    //                 message: 'Product updated successfully!',
    //                 data: UpdatedProduct
    //             });
    //         }
    //     } catch (Err) {
    //         res.status(500).json({
    //             status: false,
    //             error: Err.errmsg
    //         });
    //     }
    // }