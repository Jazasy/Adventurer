const Adventure = require("../models/adventure");

const giveAdventures = async (req, res) => {
    const adventures = await Adventure.find().populate("leader");
    res.json(adventures.reverse());
}

const giveAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const foundAdventure = await Adventure.findById(adventureId).populate("leader");
    res.json(foundAdventure);
}

const createAdventure = async (req, res) => {
    const { userId, title, description } = req.body;
    const image = req.file ? req.file.path : null;
    const AdventureDatas = { userId, title, description, image };
    for (let [key, value] of Object.entries(AdventureDatas)) {
        if (!value) {
            return res.status(403).json({
                message: `${key} is required`
            })
        }
    }
    const newAdventure = new Adventure({ leader: userId, title, description });
    newAdventure.images.push(image);
    await newAdventure.save();
    res.status(201).json({ message: "Adventure created successfully" });
}

const deleteAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const foundAdventure = await Adventure.findById(adventureId);
    if(!foundAdventure) return res.status(404).json({message: "Adventure was not found"});
    if(foundAdventure.leader.toString() === req.userId || req.role === "admin") {
        const result = await Adventure.findByIdAndDelete(adventureId);
        if (result) {
            return res.status(200).json({ message: "Adventure deleted successfully" });
        } else {
            return res.status(404).json({message: "No Adventure was deleted"});
        }
    } else {
        return res.status(403).json({message: "You don not have permission to delete this adventure"});
    }
}

module.exports = {
    giveAdventures,
    giveAdventure,
    createAdventure,
    deleteAdventure,
}