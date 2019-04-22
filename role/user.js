const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    phone: Number,
    password: String,
    location: {
        type: {type: String},
        coordinates: []
    },
    roles: Number
});

userSchema.index({location: '2dsphere'})
module.exports = mongoose.model('user', userSchema);
