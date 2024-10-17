import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

const applyToAdventure = async (adventureId, userId, setResInfos, setRefreshAplByAdv) => {
    try {
        const result = await axios.post(
            `/applications/${adventureId}`,
            { user: userId }
        );
        resInfoError(result.data.message, setResInfos);
        setRefreshAplByAdv(oldvalue => !oldvalue);
    } catch (error) {
        resInfoError(error.response.data.message, setResInfos);
    }
};

const abandonAdventure = async (applicationsByAdventure, setRefreshAplByAdv, adventurersByAdventure, setRefreshAdvByAdv, userId, setResInfos) => {
    try {
        let applicationType = null;

        let foundApplication = applicationsByAdventure.find(application => application.user._id === userId);
        if (foundApplication) {
            applicationType = "application";
        } else {
            foundApplication = adventurersByAdventure.find(adventurer => adventurer.user._id === userId);
            if (foundApplication) {
                applicationType = "adventurer";
            }
        }

        if (foundApplication) {
            const result = await axios.delete(`/applications/${foundApplication._id}`);
            if (result.data.message) {
                resInfoError(result.data.message, setResInfos);
            } else {
                resInfoError("Application abandoned", setResInfos);
            }
            switch (applicationType) {
                case "application":
                    setRefreshAplByAdv(prev => !prev);
                    break;
                case "adventurer":
                    setRefreshAdvByAdv(prev => !prev);
                    break;
                default:
                    break;
            }
        } else {
            resInfoError("Your application was not found", setResInfos);
        }
    } catch (error) {
        if (error.response.data.message) {
            resInfoError(error.response.data.message, setResInfos);
        } else {
            resInfoError("Something went wrong", setResInfos);
        }
    }
}

const refreshApplicationsByAdventureId = (applicationsByAdventure, setRefreshAplByAdv, adventurersByAdventure, setRefreshAdvByAdv, adventureId) => {
    let applicationType = null;

    let foundApplication = applicationsByAdventure.find(application => application.adventure === adventureId);
    if (foundApplication) {
        applicationType = "application";
    } else {
        foundApplication = adventurersByAdventure.find(application => application.adventure === adventureId);
        if (foundApplication) {
            applicationType = "adventurer";
        }
    }

    switch (applicationType) {
        case "application":
            setRefreshAplByAdv(prev => !prev);
            break;
        case "adventurer":
            setRefreshAdvByAdv(prev => !prev);
            break;
        default:
            setRefreshAplByAdv(prev => !prev);
            setRefreshAdvByAdv(prev => !prev);
            break;
    }
}

const deleteAdventure = async (applicationsByAdventure, setRefreshAplByAdv, adventurersByAdventure, setRefreshAdvByAdv, adventureId, setResInfos) => {
    try {
        const result = await axios.delete(`/adventures/${adventureId}`);
        if (result.data.message) {
            resInfoError(result.data.message, setResInfos);
        } else {
            resInfoError("Adventure deleted", setResInfos);
        }

        refreshApplicationsByAdventureId(applicationsByAdventure, setRefreshAplByAdv, adventurersByAdventure, setRefreshAdvByAdv, adventureId)
    } catch (error) {
        if (error.response.data.message) {
            resInfoError(error.response.data.message, setResInfos);
        } else {
            resInfoError("Something went wrong", setResInfos);
        }
    }
}

const getIsApplied = (userId, applicationsByAdventure) => {
    return applicationsByAdventure.some(application => application.user._id === userId);
}


// Should I make a request to the server to get a boolean insted?
const getIsAccepted = (userId, adventurersByAdventure) => {
    return adventurersByAdventure.some(application => application.user._id === userId);
}

export { applyToAdventure, abandonAdventure, deleteAdventure, getIsApplied, getIsAccepted };