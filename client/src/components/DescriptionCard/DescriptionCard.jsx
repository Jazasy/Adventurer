import "./DescriptionCard.css";
import { useAdventures } from "../../contexts/useAdventures";
import XButton from "../Buttons/XButton";

export default function DescriptionCard({ description }) {
    const {setShowInfo} = useAdventures();

    return (
        <div className="description-card">
            <XButton action={() => setShowInfo(null)} />
            <h3>About the Adventure</h3>
            <p>{description}</p>
        </div>
    );
}