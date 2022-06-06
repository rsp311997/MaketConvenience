const mongoose = require('../config/DBConfig');

const ReviewSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This field is required!']
    },
    productID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This field is required!']
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:false
    },
    comment:{
        type:String,
        required:false
    },
    sampleImg:{
        type:[String],
        required:false
    },
    isAssured:{
        type:Boolean,
        required:false
    }
},{
    timestamp:{
        createdAt:true,
        updatedAt:true
    }
});


const ReviewModel = mongoose.model('Reviews',ReviewSchema);

module.exports = ReviewModel;