const Adventure = require("../models/adventure");
const Application = require("../models/application");

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

const giveApplicationsByUser = async (req, res) => {
    const { userId } = req.params;
    const foundApplications = await Application.find({ user: userId }).populate("adventure");
    res.json(foundApplications);
}

const isApplied = async (req, res) => {
    const { adventureId } = req.params;
    const { userId } = req.query;
    const foundApplication = await Application.findOne({ user: userId, adventure: adventureId});
    res.json(foundApplication ? true : false);
}

module.exports = {
    giveAdventures,
    giveAdventure,
    createAdventure,
    applyToAdventure,
    giveApplications,
    isApplied,
    giveApplicationsByUser,
}