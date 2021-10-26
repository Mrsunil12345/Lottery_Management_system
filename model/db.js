const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/myapp'
mongoose.connect(url)
const db = mongoose.connection
db.on('open', () => {
    console.log("database connected");
})

require('./model')