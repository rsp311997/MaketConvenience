const express = require('express');

const notifcationRouters = express.Router();

notifcationRouters.get('/',(req,res)=>{
    res.status(200).send("Welcome to Notifications!");
});


module.exports = notifcationRouters;