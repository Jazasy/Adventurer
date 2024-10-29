const { Server } = require("socket.io");
const cors = require("cors");

const initialiseSocket = server => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        socket.on("send_message", (data) => {
            socket.broadcast.emit("receive_message", data);
        })
    })

    return io;
}

module.exports = initialiseSocket;