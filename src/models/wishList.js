const mongoose = require('../config/DBConfig');

const WishListSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        required:[true,"This field is required!"],
        unique:true
    },
    productID:{
        type:[mongoose.Schema.ObjectId]
    }
},{
    timestamp:{
        createdAt:true,
        updatedAt:true
    }
});

const WishListModel = mongoose.model('wishlists',WishListSchema);

module.exports = WishListModel;