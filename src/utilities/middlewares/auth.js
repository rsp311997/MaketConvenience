const createError = require('http-errors');
const jwt = require('jsonwebtoken');


AccessToken = (req,res,next) => {
    const token = req.cookies['access-token'];
    if(!token){ 
        return next(createError(401,'You are not authenticated!'));
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,'Token is not valid!'));
        req.user = user
        return next();
    });
}

exports.verifyUser = (req,res,next) => {
    AccessToken(req,res,(error)=>{
        if(error){
            return next(createError(error.status,error.message));
        }
        if(req.user.id === req.params.id){
            next();
        }else{
            return next(createError(403,'you are not authorized!'));
        }
    });
}

exports.verifyAdmin = (req,res,next) => {
    AccessToken(req,res,(error)=>{
        if(error){
            return next(createError(error.status,error.message));
        }
        if(req.user?.isAdmin){
            next();
        }else{
            return next(createError(403,'you are not authorized!'));
        }
    });
}

exports.verifyEmployee = (req,res,next) => {
    AccessToken(req,res,(error)=>{
        if(error){
            return next(createError(error.status,error.message));
        }
        if(req.user.isEmployee){
            next();
        }else{
            return next(createError(403,'you are not authorized!'));
        }
    });
}

exports.verifyRetailer = (req,res,next) => {
    AccessToken(req,res,(error)=>{
        if(error){
            return next(createError(error.status,error.message));
        }
        if(req.user.isRetailer){
            next();
        }else{
            return next(createError(403,'you are not authorized!'));
        }
    });
}

exports.verifyUserAndAdmin = (req,res,next) => {
    AccessToken(req,res,(error)=>{
        if(error){
            return next(createError(error.status,error.message));
        }
        if(req.user.isAdmin || req.user.id === req.params.id){
            next();
        }else{
            return next(createError(403,'you are not authorized!'));
        }
    });
}
