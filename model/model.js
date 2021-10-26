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

mongoose.model('User', userSchema)