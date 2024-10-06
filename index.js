const express = require('express');
const {createServer} = require('http');
const path = require('path');
const {Server} = require('socket.io');
const connect = require('./config/database-config');
const chatModel = require('./models/chatModel');

const app = express();
const server =  createServer(app);
const io = new Server(server)

app.use('/',express.static(path.join(__dirname, '/public')));
app.set("view engine","ejs");

io.on('connection', (socket) => {

    socket.on('join_room',(data)=>{
        console.log('Joining room received',data['roomid']);
        socket.join(data['roomid'],()=>{
            console.log('User joined room',data['roomid']);
        });
    })

    socket.on('msg_send',(data)=>{
        console.log(data);
        io.to(data['roomid']).emit('msg_rcvd',data)
    });


});

app.get('/chat/:roomid',(req,res)=>{
    res.render("index",{
        id:req.params.roomid
    });
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
    connect
        .then(()=>{console.log('Connected to database')})
        .catch((err)=>{console.log('Error connecting to database',err)});
});