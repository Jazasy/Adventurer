const Message = require("../models/message");
const Application = require("../models/application");

const giveMessagesByAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const foundApplication = await Application.findOne({ adventure: adventureId, user: req.userId, accepted: true });
    if ((foundApplication && foundApplication.user.toString() === req.userId) || req.role === "admin") {
        const foundMessages = await Message.find({ adventure: adventureId }).populate({path: "user", select: "username pfp _id"});
        res.json(foundMessages);
    } else {
        res.status(403).json({ message: "You do not have permission to see these messages" });
    }
}

const createMessage = async (req, res) => {
    const { adventureId } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });
    const foundApplication = await Application.findOne({ adventure: adventureId, user: req.userId, accepted: true });
    if ((foundApplication && foundApplication.user.toString() === req.userId) || req.role === "admin") {
        const newMessage = new Message({ user: req.userId, adventure: adventureId, content })
        await newMessage.save();
    } else {
        res.status(403).json({ message: "You do not have permission to send a message" });
    }
}

module.exports = {
    giveMessagesByAdventure,
    createMessage,
}