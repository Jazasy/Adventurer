import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

const applyToAdventure = async (adventureId, userId, setResInfos, setRefreshAdvByAdv) => {
    try {
        const result = await axios.post(
            `/adventures/${adventureId}/applications`,
            { user: userId }
        );
        resInfoError(result.data.message, setResInfos);
        setRefreshAdvByAdv(oldvalue => !oldvalue);
    } catch (error) {
        resInfoError(error.response.data.message, setResInfos);
    }
};

const getIsApplied = async (userId, adventureId, setResInfos, setIsApplied) => {
    try {
        const result = await axios.get(`/adventures/${adventureId}/applications/isApplied`, { params: { userId } });
        console.log(result.data.setIsApplied);
        setIsApplied(result.data.setIsApplied);
    } catch (error) {
        resInfoError(error.response.data.message, setResInfos);
    }
}

export { applyToAdventure, getIsApplied };