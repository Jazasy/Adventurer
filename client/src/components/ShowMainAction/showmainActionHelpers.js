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

const getIsApplied = async (userId, adventureId, setResInfos, setIsApplied) => {
    try {
        const result = await axios.get(`/applications/${adventureId}/isApplied`, { params: { userId } });
        setIsApplied(result.data);
    } catch (error) {
        resInfoError(error.response.data.message, setResInfos);
    }
}

export { applyToAdventure, getIsApplied };