const express = require('express');
const MSG = require('../models/message');
const Chat = require('../models/chat')
const auth = require('../middleware/auth')

const router = new express.Router;

router.post('/user/conversation', auth, async(req, res) => {
    
    console.log(req.body);
    //to exist karta hai?
    const to = req.body['to'];
    const toExist = await Chat.findByUserName(to);
    if(!to){
        throw new Error('second user does not exists');
    }
    
    
   
})

router.get('/user/conversation/:id', async(req, res) => {
    const _id = req.params.id;
    try{
        const findConv = await MSG.find({$in: [_id]});
        res.send(findConv)
    }catch(e){
        res.send(e);
    }
})

 module.exports = router;



//  // const {content, chatID} = req.body;
    
//     // try{
//     //     const {fromID, toID} = req.body;
//     //     const newMessage = new MSG({from: fromID, to: toID});
//     //     await newMessage.save();
//     //     res.send('New conversation created successfully')
//     // }catch(e){
//     //     res.send(e);
//     // }

//     /* const user = req.user;
//     const toWhom = req.body['to'];

//    try{
//     if(user && toWhom){
//         const message = new MSG(req.body);
//         await message.save();
//         res.send(message);
//     }
//    }catch(e){
//     res.status(400).send(e);
//    } */