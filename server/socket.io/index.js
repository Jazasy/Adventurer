const { Server } = require("socket.io");
const cors = require("cors");
const Message = require("../models/message");

const initialiseSocket = server => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        console.log("User Connected to Socket");

        socket.on("join_room", data => {
            console.log(`User Joined Socket Room: ${data}`);
            socket.join(data);
        })

        socket.on("leave_room", data => {
            console.log(`User Left Socket Room: ${data}`);
            socket.leave(data);
        })

        socket.on("send_message", (data) => {
            io.to(data.adventureId).emit("receive_message", {
                content: data.content,
                adventureId: data.adventureId,
                user: {
                    username: data.username,
                    pfp: data.pfp,
                    _id: data.userId
                }
            });
        })

        socket.on("disconnect", () => {
            console.log("User Disconnected from Socket");
        })
    })

    return io;
}

module.exports = initialiseSocket;