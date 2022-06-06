const mongoose = require('../config/DBConfig.js');

const ProductSchema = mongoose.Schema({
    retailerID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This field is required!']
    },
    title:{
        type:String,
        required:[true,'This field is required!']
    },
    brandName:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        min:1,
        max:9999999,
        required:[true,'This field is required!']
    },
    discount:{
        type:Number,
        min:0,
        required:false
    },
    stock:{
        type:Number,
        min:0,
        required:[true,'This field is required!']
    },
    description:{
        type:String,
        required:false
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:false
    },
    productImg:{
        type:[String],
        required:false
    },
    approved:{
        type:Boolean,
        default:false,
        required:false
    },
    COD:{
        type:Boolean,
        default:false,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    SubCategory:{
        type:String,
        required:true
    },
    tags:{
        type:[String]
    },
    tax:{
        type:Number,
        required:true,
        min:0
    }
},{
   timestamps:{
       createdAt:true,
       updatedAt:[true,'This field is required!']
   } 
});


const ProductModel = mongoose.model('Products',ProductSchema);


module.exports = ProductModel;