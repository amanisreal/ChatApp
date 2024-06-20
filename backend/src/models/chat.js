const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    
    roomID: {
        type:String,
    },

    chats:[{
        to: {
            type: String,
            //unique: true,
            required: true,
        },

        from: {
            type: String,
            //unique: true,
            required: true
        },
        chat:{
            type: String,
            required: true,
        }
    }]

    // lastMessage: {
    //     type: String,
    // },
}, {
    timestamps: true
})

//now we de findby roomID
chatSchema.statics.findByRoomID = async function (roomId) {
    const roomExists = await Chat.findOne({roomID: roomId});
    console.log('k')
    if(!roomExists){
        return null;
    }
    return roomExists;
}

chatSchema.statics.findByME = async function (userID) {
    const users = [];
    const allRooms = await Chat.find({});
    allRooms.forEach((room) => {console.log(room)
        if(room.roomID.includes(userID)){
            console.log(room)
            users.push(room);
        }
    })

    return users;
}

// chatSchema.statics.findByUserName = async function (user1, user2)  {
//     // console.log('u', userName)
//     const to = await Chat.findOne({user1: user1, user2: user2});
//     console.log(to)
//     //const apnaWala = 
//     if(to){
//         return to;
//     }
//     return null;
// }

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat