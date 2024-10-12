const Application = require("../models/application");
const Adventure = require("../models/adventure");

const applyToAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const { user } = req.body;
    const foundApplication = await Application.findOne({ user, adventure: adventureId });
    if (foundApplication) return res.status(400).send({ message: "You have already applied to this adventure" });
    const newApplication = new Application({ user, adventure: adventureId });
    await newApplication.save();
    res.status(201).json({ message: "Application sent successfully" });
}

const giveApplicationsByAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const foundApplications = await Application.find({ adventure: adventureId, accepted: false }).populate("user");
    foundApplications && res.json(foundApplications);
    /* const foundAdventure = await Adventure.findById(adventureId);
    const userId = req.userId;                                          // I need to valiate the user for this
    if (foundApplications && foundAdventure) {
        if (foundAdventure.leader.toString() === userId || req.role === "admin") {
            return res.json(foundApplications);
        }
    } */
}

const giveAcceptedApplicationsByAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const foundApplications = await Application.find({ adventure: adventureId, accepted: true }).populate("user");
    res.json(foundApplications);
}

const giveApplicationsByUser = async (req, res) => {
    const { userId } = req.params;
    const foundApplications = await Application.find({ user: userId }).populate({ path: "adventure", populate: { path: "leader" } });
    res.json(foundApplications);
}

const giveAcceptedApplicationsByUser = async (req, res) => {
    const { userId } = req.params;
    const foundApplications = await Application.find({ user: userId, accepted: true }).populate({ path: "adventure", populate: { path: "leader" } });
    res.json(foundApplications);
}

const isApplied = async (req, res) => {
    const { adventureId } = req.params;
    const { userId } = req.query;
    const foundApplication = await Application.findOne({ user: userId, adventure: adventureId });
    res.json(foundApplication ? true : false);
}

const acceptApplication = async (req, res) => {
    const { applicationId } = req.params;
    const userId = req.userId;
    const foundApplication = await Application.findById(applicationId).populate({ path: "adventure", select: "leader" });
    if (!foundApplication) return res.status(404).json({ message: "Application was not found" });
    if (foundApplication.adventure.leader.toString() === userId || req.role === "admin") {
        foundApplication.accepted = true;
        await foundApplication.save();
        res.status(200).json({ message: "Application accepted successfully" });
    } else {
        res.status(403).json({ message: "You don't have permission to accept this application" });
    }
}

module.exports = {
    applyToAdventure,
    giveApplicationsByAdventure,
    giveAcceptedApplicationsByAdventure,
    giveApplicationsByUser,
    giveAcceptedApplicationsByUser,
    isApplied,
    acceptApplication
}