const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: [20]
    },
    password: {
        type: String,
        required: true,
    },
    loggedIn: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema);