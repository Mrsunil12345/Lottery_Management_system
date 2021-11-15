const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    city: {
        type: String
    },
    status: {
        type: Boolean
    }
})

const user=mongoose.model('User', userSchema)
module.exports=user