const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    phone: Number,
    password: String,
    address: Array,
    roles: Number
});

module.exports = mongoose.model('user', userSchema);
