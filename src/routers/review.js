const express = require('express');

const reviewRouters = express.Router();

reviewRouters.get('/',(req,res)=>{
    res.status(200).send("Welcome to reviews!");
});


module.exports = reviewRouters;