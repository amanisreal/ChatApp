const express = require('express');
const Post = require('../models/post')
const auth = require('../middleware/auth')

const router = new express.Router;

//get all the avail posts
router.get('/posts', async(req, res) => {
    try{
        const posts = await Post.find({});
        res.status(200).send(posts);
    }catch(e){
        res.status(400).send(e);
    }
})


//post users
router.post('/post',  async(req, res) => {
    try{
        const newPost = new Post(req.body);
        await newPost.save();
        res.send(newPost)
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;