const mongoose = require('../config/DBConfig.js');

const CartItemSchema = mongoose.Schema({
    productID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This field is required!']
    },
    quantity:{
        type:Number,
        min:1,
        default:1,
        required:false
    }
},{
    timeStamp:{
        createdAt:true,
        updatedAt:true
    }
});

const CartSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This field is required!'],
        unique:true
    },
    cartItems:{
        type:[CartItemSchema],
        required:false
    }
},{
    timestamp:{
        createdAt:true,
        updatedAt:true
    }
});


const CartModel = mongoose.model('Carts',CartSchema);

module.exports = CartModel;