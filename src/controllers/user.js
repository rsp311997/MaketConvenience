const UserModel = require('../models/user.js');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

exports.GetAllUsers = async (req,res,next) =>{
    try {
        const AllUsers = await UserModel.find({}, { __v: 0 });
        res.status(200).json({
            status: true,
            data: AllUsers
        });
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}


exports.GetUsersByID = async (req, res, next) => {
    try {
        const user = await UserModel.find({ _id: req.params.id }, { __v: 0, password:0 });
        if (user == null) {
            res.status(404).json({
                status: false,
                message: 'User not found!'
            });
        } else {
            res.status(200).json({
                status: true,
                data: user
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}

exports.UpdateUserByID = async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (user === null) {
            res.status(404).json({
                status: false,
                message: 'User not found!'
            });
        } else {
            const {password,...otherDetails} = user._doc
            res.status(200).json({
                status: true,
                message:'Uses updated successfully!',
                data: [{...otherDetails}]
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}

exports.DeleteUserByID = async (req, res, next) => {
    try {
        const user = await UserModel.findOneAndDelete(req.params.id);
        if (user == null) {
            res.status(404).json({
                status: false,
                message: 'User not found!'
            });
        } else {
            res.status(200).json({
                status: true,
                message:'User deleted successfully!'
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}

exports.UpdateUserPasswordByID = async (req, res, next) => {
    try {
        const user = await UserModel.findById(id=req.params.id);
        if(!user) return next(createError(404,'User not found!'));
        if(req.body.password !== req.body.confirmPassword) return next(createError(403,'New passowrd and confirm Password mismatch!'));
        
        const gensalt = bcrypt.genSaltSync(10);
		const hashPwd = bcrypt.hashSync(req.body.password,gensalt);

        const isPasswordUpdate = await UserModel.findOneAndUpdate(
                                                {_id:req.params.id},
                                                {$set:{password:hashPwd}}
                                            )
        if(isPasswordUpdate){
            return res.status(200).json({
                status:true,
                message:'Your passwod reset successfully!'
            });
        }else{
            return next(createError(400,'Failed to reset new password!'));
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}