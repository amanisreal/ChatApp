const express = require('express');
const userRouter = require('./routes/users');
const chatRouter = require('./routes/chats');
const msgRouter = require('./routes/messages');
const postRouter = require('./routes/posts')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');
require('./database/mogoose')

const app = express();
app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(userRouter);
app.use(chatRouter);
app.use(msgRouter)
app.use(postRouter)
app.use(cors());

const corseOption = {
    origin: '*',
    Credentials: true,
    OptionSuccessStatus: 200,
}

app.use(cors(corseOption))


// socket connection code niche
// const server = http.createServer(app);
// const io = socketio(server);

// io.on('connection', (socket) => {
//     socket.on('msgRec', (msg) => {
//         io.emit('message', msg);
//     })
// })


//socket connection code upar


app.listen('3001', () => {

    console.log('port is live on server 3001')
})