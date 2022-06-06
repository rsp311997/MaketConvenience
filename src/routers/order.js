const express = require('express');

const orderRouters = express.Router();

orderRouters.get('/',(req,res)=>{
    res.status(200).send("Welcome to orders!");
});


module.exports = orderRouters;