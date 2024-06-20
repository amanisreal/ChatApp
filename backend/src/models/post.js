const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    imageFile:{
        required: true,
    },

    caption:{
        type: String,
    },

    from:{
        type: String
    }
})

const Post = new mongoose.model('Post', postSchema);

module.exports = Post;