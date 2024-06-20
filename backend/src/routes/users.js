const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')
require('../database/mogoose')

const router = new express.Router;

//get all users for personal 
//delete later
// router.get('/user', async (req, res) => {
//     try{
//         const users = await User.find({});
//         res.send(users)
//     }catch(e){
//         res.send(e);
//     }
// })

//get current usr
router.get('/user/me', auth, async (req, res) => {
    res.status(200).send(req.user);
})

//create user
router.post('/user', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    console.log(user);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        console.log('uer ka tken', token)
        res.status(201).send({user, token});
    }catch(e){
        res.status(401).send(e);
    }
})

//update user
router.patch('/user/me/update', auth, async (req, res) => {
    const updatesMade = Object.keys();
    const allowedUpdates = ['name', 'email', 'password'];

    const isAllowed = updatesMade.forEach((update) => {
        return allowedUpdates.includes(update);
    })
    
    try{
        if(!isAllowed){
            throw new Error('Invalid updates')
        }
        const user = req.user

        if(!user){
            throw new Error('No user found ')
        }
        updatesMade.forEach((update) => {
            user[update] = req.body[update];
        })
        await user.save();

        res.send(user);

    }catch(e){
        res.send(e);
    }
})

//delete user
router.delete('/user/me', auth, async (req, res) => {
    try{
        const user = await User.findByIdAndDelete({_id: req.user._id})
        if(!user){
            throw new Error('No user found')
        }

        res.send(user);
    }catch(e){
        res.send(e);
    }
})

//user login 
router.post('/user/login', async (req, res) => {
    
res.set('Access-Control-Allow-Origin', '*');
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        console.log(user, token);
        res.send({user, token});
    }catch(e){
        res.send(e);
    }
})

//logout
router.post('/user/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })

        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
})

//logout all
router.post('/user/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;