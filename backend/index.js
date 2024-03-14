const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: true
});

let collaborators = [];
let activeSockets = [];

let audioBoard = [['http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg'], 
["http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3", 
'http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg', 
'http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg', 
'http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg'], 
['http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg',
'http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg', 
'http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg']];

app.get('/', (req, res) => {
    res.send('Server chalu che...');
});

io.on('connection', (socket) => {
    console.log('Connection-new', socket.id);
    activeSockets.push(socket.id);
    console.log(activeSockets);
    io.emit('collab-update', activeSockets);

    socket.emit('init', {
        data: audioBoard
    });

    socket.on('change', (data) => {
        io.emit('change', data);
        audioBoard = data.data;
    })

    socket.on('disconnect', () => {
        const index = activeSockets.indexOf(socket.id);
        activeSockets.splice(index, 1);
        io.emit('collab-update', activeSockets);
    });
});

server.listen(3000, () => {
    console.log('Server listening on : 3000');
});