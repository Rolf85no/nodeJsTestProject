const mongoose = require('mongoose')

////// BYTT UT USERNAME MED USER-ID DETTE GJØR AT MAN KAN BYTTE NAVN UTEN AT MAN MISTER POSTS

const PostSchema = new mongoose.Schema({
    userID:
    {
        type: String, required: [true],
        trim: true,
        maxlength: [20]
    },
    post: {
        type: String,
        trim: true,
        maxlength: [150]
    },
    replies: [{
        username: {
            type: String,
        },
        post: {
            type: String,
            trim: true,
            maxlength: [150]
        },
    }]
})

module.exports = mongoose.model('Post', PostSchema);