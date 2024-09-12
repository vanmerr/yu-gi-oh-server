const { Server } = require('socket.io');

const socket_server = (http_server) => {
    const io = new Server(http_server, {
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

        require('./handlers')(socket, io);
    });

    return io;
}

module.exports = socket_server;  
