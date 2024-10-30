const { Server } = require("socket.io");
const cors = require("cors");
const Message = require("../models/message");

const initialiseSocket = server => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        socket.on("join_room", data => {
            socket.join(data);
        })

        socket.on("send_message", (data) => {
            socket.to(data.adventureId).emit("receive_message", data);
            console.log(data);
        })
    })

    return io;
}

module.exports = initialiseSocket;