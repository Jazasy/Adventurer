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
        console.log("User Connected");

        socket.on("join_room", data => {
            console.log(`User Joined Room: ${data}`);
            socket.join(data);
        })

        socket.on("leave_room", data => {
            console.log(`User Left Room: ${data}`);
            socket.leave(data);
        })

        socket.on("send_message", (data) => {
            io.to(data.adventureId).emit("receive_message", data);
            console.log(data);
        })

        socket.on("disconnect", () => {
            console.log("User Disconnected");
        })
    })

    return io;
}

module.exports = initialiseSocket;