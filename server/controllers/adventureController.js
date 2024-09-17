const Adventure = require("../models/adventure");

const giveAdventures = async (req, res) => {
    const adventures = await Adventure.find().populate("leader").populate("posts");
    res.json(adventures);
}

const giveAdventure = async (req, res) => {
    const {id} = req.params;
    const foundAdventure = await Adventure.findById(id).populate("leader").populate("posts");
    res.json(foundAdventure);
}

module.exports = {
    giveAdventures,
    giveAdventure,
}