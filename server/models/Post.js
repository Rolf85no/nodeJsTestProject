const mongoose = require('mongoose')

////// BYTT UT USERNAME MED USER-ID DETTE GJØR AT MAN KAN BYTTE NAVN UTEN AT MAN MISTER POSTS

const PostSchema = new mongoose.Schema({
    username:
    {
        type: String, required: [true],
        trim: true,
        maxlength: [25]
    },
    post: {
        type: String,
        trim: true,
        maxlength: [150]
    },
    userID: {
        type: String,
        trim: true
    },
    replies: [{
        userID: {
            type: String,
            trim: true
        },
        post: {
            type: String,
            trim: true,
            maxlength: [150]
        },
    }]
})

module.exports = mongoose.model('Post', PostSchema);