const Chat = require('../models/chat');
const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router;


//post a chat --> the final one
//dry violated 
router.post('/user/chat', auth, async(req, res) => {
   const userFrom = req.user;
   const userTo = req.body['to'];
    try{
        const doesUserToExists = await User.findByUserName(userTo);
        if(!doesUserToExists){
            throw new Error('Such user does not exists')
        }

        //now check if room exists
       
        const roomID1 = userFrom._id.toString() + doesUserToExists._id.toString();
        const roomID2 =  doesUserToExists._id.toString()+userFrom._id.toString();
        //console.log(roomID)
        const roomExists1 = await Chat.findByRoomID(roomID1);
        const roomExists2 = await Chat.findByRoomID(roomID2);
        
        console.log(roomExists1)
        console.log(roomExists2)
        if(!roomExists1 & !roomExists2){
            console.log('ok')
            //make a new room
            const msg = req.body['chat'];
            console.log(req.body)
            const newRoom = new Chat(req.body)
            console.log(newRoom)
            try{
                await newRoom.save();
                res.send(newRoom)
            }catch(e){
                res.status(400).send(e);
            }
        }
        else if(roomExists2){
            console.log('in')
            
            roomExists2.chats = roomExists2.chats.concat(req.body);
            await roomExists2.save();
            res.send(roomExists2);
        }
        else{
            
            roomExists1.chats = roomExists1.chats.concat(req.body);
            // console.log(roomExists1)
            await roomExists1.save();
            res.send(roomExists1);
        }
        

    }catch(e){
        res.status(400).send(e);
    }
   
})

router.get('/chats', auth, async(req, res) => {
    try{
        console.log(req.user._id)
        const users = await Chat.findByME(req.user._id)
        console.log(users);
        console.log('ab')
        res.send(users);
    }catch(e){
        res.status(400).send(e);
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//get all the chats of the user
router.get('/user/chats', auth, async(req, res) => {
    const user = req.user;
    try{
        const chats = await Chat.find({});

        res.status(200).send(chats);
    }catch(e){
        res.status(400).send(e);
    }
})

router.post('/user/chats', auth, async(req, res) => {
    const user = req.user;
    console.log(user);
    // console.log(req.body['to']);
    try{
       // cost userName  = 
        const to = await Chat.findByUserName(req.body['to'], req.user.name);
        if(to){
            //matlab chat exist karti hai and we need to update new msgs
        }
        console.log('IBBOjbj')
        const chat  = new Chat(req.body);
        console.log(chat);
        await chat.save();
        res.send(chat);
    }catch(e){
        res.status(400).send(e);
    }
})

//if catch already exist karta hai to msg array ko update karke ho sakta hai?
router.patch('/user/chat', auth, async(req, res) => {
    const from = req.user;
    const to = req.body['to'];
    console.log(req.body);
    // console.log(to)
    console.log("akk ok here")
    try{
        const fromToExist = await Chat.findByUserName(to, req.user.name);
        console.log(fromToExist)
        if(!fromToExist){
            throw new Error('Create new chat first');
        }

        const msg = req.body['chat']
        console.log(msg);
        fromToExist.chats = fromToExist.chats.concat(req.body);

        await fromToExist.save();
        res.send(fromToExist);
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;