const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    author: { 
        type: String,
         required: true 
        },
    upvote: {
        type: Number,
        required: true
    },
    downvote : {
        type: Number,
        required: true
    },
});


module.exports = Post