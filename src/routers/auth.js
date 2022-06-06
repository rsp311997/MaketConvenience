const express = require('express');

//controller
const authController = require('../controllers/auth.js');
//utils/middleware
const Verify = require('../utilities/middlewares/auth.js');

const authRouters = express.Router();

authRouters.post('/login',authController.Login);
authRouters.post('/verify-for-register',authController.VerifyForRegister);
authRouters.post('/register',authController.Register);
authRouters.post('/forgotpassword',authController.ForgotPassword);
authRouters.post('/resetpassword',authController.ResetPassword);

module.exports = authRouters;