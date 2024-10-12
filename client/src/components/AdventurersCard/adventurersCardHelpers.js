import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

const getApplicants = async (adventureId, setApplicationsByAdventure, setResInfos) => {
    try {
        const result = await axios.get(`/applications/${adventureId}`);
        setApplicationsByAdventure(result.data);
        
    } catch (error) {
        resInfoError(error.response.data.message, setResInfos);
    }
};

export { getApplicants };