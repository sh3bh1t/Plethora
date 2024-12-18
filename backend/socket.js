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
            console.log('User joined:', userId, userType);
            if(userType==='user'){
                await User.findByIdAndUpdate(userId,{
                    socketId:socket.id});
            }else if(userType==='driver'){
                await Driver.findByIdAndUpdate(userId,{
                    socketId:socket.id});
            }
        });

        socket.on('update-location-driver', async(data) => {
            const { userId, location } = data;
            if ( !userId || !location || !location.ltd  || !location.lng ) {
                return socket.emit('error', {message : 'Invalid location data'});
            }
            // console.log('User location updated:', userId, location);
                await Driver.findByIdAndUpdate(userId, {location:{
                    ltd:location.ltd,
                    lng:location.lng
                }});
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
