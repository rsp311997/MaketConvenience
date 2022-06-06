const express = require('express');

//Controllers
const userControllers = require('../controllers/user.js');
//Middleware
const Verify = require('../utilities/middlewares/auth.js');

const userRouters = express.Router();

userRouters.get('/',Verify.verifyAdmin,userControllers.GetAllUsers);
userRouters.get('/:id',Verify.verifyUser,userControllers.GetUsersByID);
userRouters.put('/:id',Verify.verifyUser,userControllers.UpdateUserByID);
userRouters.delete('/:id',Verify.verifyUserAndAdmin,userControllers.DeleteUserByID);
userRouters.put('/change-password/:id',Verify.verifyUser,userControllers.UpdateUserPasswordByID);



module.exports = userRouters;