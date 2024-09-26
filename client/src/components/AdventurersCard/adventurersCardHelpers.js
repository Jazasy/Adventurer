import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

const getAdventurers = async (adventureId, setAdventurersByAventure, setResInfos) => {
    try {
        const result = await axios.get(`/adventures/${adventureId}/applications`);
        setAdventurersByAventure(result.data);
    } catch (error) {
        resInfoError(error.response.data.message, setResInfos);
    }
};

export { getAdventurers };