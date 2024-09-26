const Adventure = require("../models/adventure");
const Application = require("../models/application");

const giveAdventures = async (req, res) => {
    const adventures = await Adventure.find().populate("leader");
    res.json(adventures);
}

const giveAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const foundAdventure = await Adventure.findById(adventureId).populate("leader");
    res.json(foundAdventure);
}

const applyToAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const { user } = req.body;
    const foundApplication = await Application.findOne({ user, adventure: adventureId });
    if (foundApplication) return res.status(400).send({ message: "You have already applied to this adventure" });
    const newApplication = new Application({ user, adventure: adventureId });
    await newApplication.save();
    res.status(201).json({ message: "Application sent successfully" });
}

const giveApplications = async (req, res) => {
    const { adventureId } = req.params;
    const foundApplications = await Application.find({ adventure: adventureId }).populate("user");
    res.json(foundApplications);
}

module.exports = {
    giveAdventures,
    giveAdventure,
    applyToAdventure,
    giveApplications,
}