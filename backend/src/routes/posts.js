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
router.post('/post', auth, async(req, res) => {
    console.log()
})