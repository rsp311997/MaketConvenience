const mongoose = require('../config/DBConfig');

const NotificationSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This field is required!']
    },
    title:{
        type:String,
        required:[true,'This field is required!']
    },
    message:{
        type:String,
        required:[true,'This field is required!']
    },
    read:{
        type:Boolean,
        default:false,
        required:false
    }
},{
    timestamp:{
        createdAt:true,
        updatedAt:true
    }
});


const NotificationModel = mongoose.model('Notifications',NotificationSchema);

module.exports = NotificationModel;
