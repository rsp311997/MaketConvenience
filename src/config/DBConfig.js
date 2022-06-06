const mongoose = require('mongoose');

require('dotenv').config()

const DBString = process.env.MONGODB; //Environment variable

const DBOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(DBString,DBOptions).then(()=>{console.log('DB connection successful!')});

// mongoose.disconnect.on('disconnection',()=>{
//     console.log('DB is disconnected!');
// });

// mongoose.connect.on('connection', (stream) => {
//     console.log('DB is connected!');
// });

module.exports = mongoose;