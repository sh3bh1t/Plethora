const socketIo = require('socket.io');
const User=require('./models/user.model.js');
const Driver=require('./models/driver.model.js');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join', async(data) => {
            const {userId,userType}=data;
            if(userType==='user'){
                await User.findByIdAndUpdate(userId,{
                    socketId:socket.id});
            }else if(userType==='driver'){
                await Driver.findByIdAndUpdate(userId,{
                    socketId:socket.id});
            }
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
