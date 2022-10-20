const mongoose = require('mongoose');

const PostsModel = mongoose.model(
    "node-api",
    {
        name: {
            type: String,
            require: true
        },
        mail: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            default: Date.now
        }

    },
    "posts"
)
module.exports = { PostsModel };

