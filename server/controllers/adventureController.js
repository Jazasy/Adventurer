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

module.exports = {
    giveAdventures,
    giveAdventure,
    createAdventure,
}