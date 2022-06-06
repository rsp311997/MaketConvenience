const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

const sessionStore = MongoStore.create({
    mongoUrl:process.env.MONGODB, //Environment variable
    collection:'sessions'
});

const Session = session({
    name:'session-cookies',
    secret:process.env.SECRET, //Environment variable
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge:1000*60*60*24
    }
});

module.exports = Session;